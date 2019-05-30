import { Component, ViewEncapsulation, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';

import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { DateTimePicker } from '@syncfusion/ej2-calendars';
import { RadioButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-angular-popups';
import { ScheduleComponent, EventSettingsModel, View, EventRenderedArgs, WorkHoursModel, PopupOpenEventArgs } from '@syncfusion/ej2-angular-schedule';
import { extend } from '@syncfusion/ej2-base';
import $ from "jquery";
import { L10n } from '@syncfusion/ej2-base';

import { EditLichtapbayComponent } from '../edit-lichtapbay/edit-lichtapbay.component'
import { LichtapbayService, LichTapBay } from '../../services/event/lichtapbay.service';
import { DronedaotaoService, DroneDaoTao } from '../../services/training/dronedaotao.service';
import { DiadiembayService, DiaDiemBay } from '../../services/training/diadiembay.service';
import { UserService, User } from '../../services/auth/user.service';
import { AuthService } from '../../services/auth/auth.service';
import { DataService } from '../../services/helper/data.service';
import { HelperService } from '../../services/helper/helper.service';
import { Issue, IssueService, IssueCategory } from '../../services/event/issue.service.service';
import { FiltercalendarService } from '../../services/filter/filtercalendar.service';
import { ChangesfeedService } from '../../services/changesfeed/changesfeed.service';
import { Config } from '../../services/helper/config';

L10n.load({
    'en-US': {
        'schedule': {
            'saveButton': 'Lưu',
            'cancelButton': 'Đóng',
            'deleteButton': 'Xóa',
            'confirmDelete': 'Xác nhận xóa',
            'delete': 'Xóa',
            "deleteContent": "Bạn chắc chắn muốn xóa sự kiện này?",
            "deleteEvent": "Xóa sự kiện",
            'cancel': 'Đóng',
            "close": "Đóng",
            'newEvent': 'Tạo mới',
            'day': 'Ngày',
            'week': 'Tuần',
            'month': 'Tháng',
            'today': 'Hôm nay',
            'edit': 'Sửa',
            "editEvent": "Sửa lịch",
            "monthAgenda": "Danh sách theo tháng",
        },
    }
});

@Component({
  selector: 'app-user-calendar',
  templateUrl: './user-calendar.component.html',
  styleUrls: ['./user-calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserCalendarComponent implements OnInit {
    @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;
    public selectedDate: Date = new Date();
    public scheduleView: View = 'Month';
    public events: any[] = [];
    public eventsList: any[] = [];
    public workHours: WorkHoursModel = { highlight: false };
    public startHour: string = '06:00';
    public endHour: string = '23:00';
    public allowMultiple: Boolean = true;
    public temp: string = '<div class="tooltip-wrap">' +
    '<div class="content-area"><div class="name">${Subject}</></div>' +
    '<div class="time">From&nbsp;:&nbsp;${StartTime.toLocaleString()} </div>' +
    '<div class="time">To&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;${EndTime.toLocaleString()} </div></div></div>';
    eventSettings: EventSettingsModel;
    isIssue: boolean = false;
    isLichTapBay: boolean = false;
    isNewLichTapBay: boolean = false;
    isNewIssue: boolean = false;
    loadingData: boolean = true;
    // Cac thanh phan cua edit template
    @ViewChild('StartTime') startTimeElement: DateTimePicker; // thoi gian bat dau trong user-calendar
    @ViewChild('EndTime') endTimeElement: DateTimePicker;// thoi gian ket thuc trong user-calendar
    @ViewChild('EventPlace') eventPlaceElement: DropDownList; // dia diem trong user-calendar

    // filter
    public droneList: any[] = [];
    public fieldsDrone: any;
    public placeholderDrone: string = "Lựa chọn drone";

    public placeList: any[] = [];
    public fieldsPlace: any;
    public placeholderPlace: string = "Lựa chọn địa điểm";
    
    public fieldsStatus: any;
    public placeholderStatus: string = "Lựa chọn trạng thái";

    public issueCateList: any[] = [];

    public selectedDrone: any;
    public selectedStatus: any;
    public selectedPlace: any;
    public selectedStatusIssue: any;

    // ngModel - data binding in template event edit
    @Input() selectedLichTapBayData: any;

    // ngModel - data binding in issue template edit
    @Input() selectedIssueData: any;

    // maps the appropriate column to fields property
    public default : string = 'Default';

    // changes feed
    // count down timer
    priorTime: string;
    calTimer: any;
  
    constructor(private lichbaySrv: LichtapbayService,
        private issueSrv: IssueService,
        private droneSrv: DronedaotaoService,
        private placeSrv: DiadiembayService,
        private userSrv: UserService,
        private authSrv: AuthService,
        private dataSrv: DataService,
        private helperSrv: HelperService,
        private filterCalSrv: FiltercalendarService,
        private changesFeedSrv: ChangesfeedService,
        private router: Router) {}

    ngOnInit() {
        // kiem tra xem da login chua
        if (!this.authSrv.loggedIn) { // neu chua login
            let key = 'PriorUrl'
            this.dataSrv.setItem(key, '/user-calendar') // Luu url lai de sau khi login se nhay vao trang nay
            this.router.navigateByUrl('/signin'); // chuyen sang trang login
            return;
        }
        let key = 'CurrentUser'
        let currentUser = this.userSrv.getCurrentUser(key);

        // init list events
        this.initItems(currentUser);
    }

    ngOnDestroy(): void {
        clearInterval(this.calTimer);
    }

    initItems(currentUser) {
        this.getItem(currentUser);
    
        this.fieldsDrone = { text: 'tenDrone', value: 'id' };
        this.fieldsStatus = { text: 'name', value: 'id' };
        this.fieldsPlace = { text: 'diaChi', value: 'id' };
    }

    private async getItem(currentUser) {
        this.events = [];
        this.placeList = [];
        this.droneList = [];
        await this.fetchEvent(currentUser) // event + issue neu co
        await this.fetchDrone(currentUser);
        await this.fetchPlace(currentUser);
        if (this.userSrv.isUser) { // neu la user thi ms fetch nha cung cap
            await this.fetchAllSup();
        }
        this.loadingData = false;
    }

    private async fetchEvent(currentUser) {
        await this.createLichTapBay(currentUser);
        
        if (this.userSrv.isSup) {     
            await this.createIssue(currentUser);
            await this.fetchIssueCategory();
        }
        
        // User or Sup
        this.dataSrv.setItem('events', this.events)
        this.eventsList = JSON.parse(JSON.stringify(this.events));
        this.dataSrv.setItem('eventsList', this.eventsList)
        this.eventSettings = {
            dataSource: <Object[]>extend([], this.events, null, true),
            enableTooltip: true,
            tooltipTemplate: this.temp,
        };

        if (this.userSrv.isUser) {
            let that = this;
            this.calTimer = setInterval(
                this.updateChangesFeedFlyPlanByUser,
                Config.changeFeedTime,
                that
            );
        } else {
            let that = this;
            this.calTimer = setInterval(
                this.updateChangesFeedFlyPlanBySup,
                Config.changeFeedTime,
                that
            );
        }
    }

    private async createLichTapBay(currentUser) {
        let eventsPromise;
        
        // User or Sup
        if (this.userSrv.isUser) {
            eventsPromise = await this.lichbaySrv.fetchFlyPlanByUserID(currentUser['id']);
        } else {
            eventsPromise = await this.lichbaySrv.fetchFlyPlanByNccId(currentUser['id']);    
        }

        eventsPromise.forEach(eventList => {
            eventList['content'].forEach(e => {
                let event = new LichTapBay(e.id, e.ghiChu, new Date(e.thoiGianBatDau), new Date(e.thoiGianKetThuc),
                                            e.noiDung, e.trangThai, e.nguoiDangKy, e.nhaCungCap, e.nhaCungCap.id,
                                            e.diaDiemBay, e.diaDiemBay.id, e.droneDaoTao,  e.droneDaoTao.id);
                this.setStatusEvent(event);
  
                this.events.push(event);
            });
        });
        this.dataSrv.setItem('LichTapBayLocal', this.events);
        this.reloadDataSource();
    }

    private async createIssue(currentUser) {
        let issuePromise;
        issuePromise = await this.issueSrv.fetchIssue(currentUser['id']);
        let stt = 0;
        issuePromise.forEach(issueList => {
            issueList['content'].forEach(i => {
                let plannedStart = this.helperSrv.formatDateTime(i.duTinhBatDau);
                let plannedEnd = this.helperSrv.formatDateTime(i.duTinhKetThuc);
                let start = this.helperSrv.formatDateTime(i.thoiGianBatDau);
                let end = this.helperSrv.formatDateTime(i.thoiGianKetThuc);
                let title = i.moTa;
                //started
                if(start && !end){
                    let issue = new Issue(i.id, title, new Date(i.thoiGianBatDau), new Date(),
                     i.moTa, i.nhaCungCap, 2, i.loaiLoi['0']);
                    this.events.push(issue);
                }
                //ended
                if(start && end){
                    let issue = new Issue(i.id, title, new Date(start), new Date(end),
                     i.moTa, i.nhaCungCap, 3, i.loaiLoi['0']);
                    this.events.push(issue);
                }
                // //planed
                if(plannedStart && plannedEnd && !start && !end){
                    let issue = new Issue(i.id, title, new Date(plannedStart), new Date(plannedEnd),
                     i.moTa, i.nhaCungCap, 1, i.loaiLoi['0']);
                    this.events.push(issue);
                }
            });
            this.reloadDataSource();
            this.dataSrv.setItem('events', this.events);
            this.eventsList = JSON.parse(JSON.stringify(this.events));
            this.dataSrv.setItem('eventsList', this.eventsList)
        })
    }

    private async fetchIssueCategory() {
        let issueCatePromise;
        issueCatePromise = await this.issueSrv.fetchIssueCategory();
        issueCatePromise.forEach(issueCateList => {
            issueCateList['content'].forEach(issueCate => {
                let issuecate = new IssueCategory(issueCate.id, issueCate.mauLoi, issueCate.tenLoi)
                this.issueCateList.push(issuecate);
            });
        });
        this.dataSrv.setItem('issueCate', this.issueCateList)
    }

    private async fetchDrone(currentUser) {
        let dronesPromise: any;

        // User or Sup
        dronesPromise = this.userSrv.isUser? await this.droneSrv.fetchAllDrone():
        await this.droneSrv.fetchDroneByNccId(currentUser['id']);
        
        dronesPromise.forEach(droneList => {
            droneList['content'].forEach(dr => {
                let drone = new DroneDaoTao(dr.tenDrone, dr.moTa, dr.id, dr.maDrone, dr.nhaCungCap);
                this.droneList.push(drone);
            });
        });
        this.dataSrv.setItem('droneTraning', this.droneList);
    }

    private async fetchPlace(currentUser) {
        let placesPromise;
        //User or Sup
        placesPromise = this.userSrv.isUser? await this.placeSrv.fetchAllPlace():
                        await this.placeSrv.fetchFlyPlaceByNccId(currentUser['id']);
        placesPromise.forEach(droneList => {
            droneList['content'].forEach(pl => {
                let place = new DiaDiemBay(pl.diaChi, pl.id, pl.nhaCungCap);
                this.placeList.push(place);
            });
        });

        //User or Sup
        this.dataSrv.setItem('placeTraning', this.placeList)
    }

    private setStatusEvent(event) {
        switch (event.status) {
            case this.dataSrv.statusList[0].eName:
                event.status = this.dataSrv.statusList[0].name
                this.setStatusPlanned(event);
                break;
            case this.dataSrv.statusList[1].eName:
                event.status = this.dataSrv.statusList[1].name
                this.setStatusAccepted(event);
                break;
            case this.dataSrv.statusList[2].eName:
                event.status = this.dataSrv.statusList[2].name
                this.setStatusStarted(event);
                break;
            case this.dataSrv.statusList[3].eName:
                event.status = this.dataSrv.statusList[3].name
                this.setStatusRejected(event);
                break;
            case this.dataSrv.statusList[4].eName:
                event.status = this.dataSrv.statusList[4].name
                this.setStatusEnded(event);
                break;
            default:
                break;
        }
    }

    private setStatusPlanned(event: LichTapBay) {
        event.CategoryColor = "#7fa900";
    }

    private setStatusAccepted(event: LichTapBay) {
        event.CategoryColor = "#229954";
    }

    private setStatusStarted(event: LichTapBay) {
        event.CategoryColor = "#2874A6";
    }

    private setStatusRejected(event: LichTapBay) {
        event.CategoryColor = "#95A5A6";
    }
    
    private setStatusEnded(event: LichTapBay) {
        event.CategoryColor = "#154360";
    }

    // fetch tat ca nha cung cap
    public async fetchAllSup() {
        let supPromise: any;
        let supplierList = [];
        let token = this.userSrv.getToken();
        supPromise = await this.userSrv.fetchAllSup(token)
        supPromise.forEach(supList => {
            supList['data'].forEach(sup => {
                let newSup = new User(sup.dia_chi, sup.email, sup.ho_ten, sup.id, sup.so_dien_thoai,
                    {id: 1, tenVaiTro: "employee"})
                    supplierList.push(newSup);
            });
            this.dataSrv.setItem('SupplierList', supplierList);
        });
    }

    public async updateChangesFeedFlyPlanBySup(that) {
        let key = 'priorTime';
        that.priorTime = that.dataSrv.getItem(key);
        if (!that.priorTime) {
            that.priorTime = (new Date()).toISOString();
        }
        that.dataSrv.setItem(key, (new Date()).toISOString());
        let listCreatedFlyPlanIDs: Array<number> = [];
        let listUpdatedFlyPlanIDs: Array<number> = [];
        let listDeletedFlyPlanIDs: Array<number> = [];
        let listChangesFeed = await that.changesFeedSrv.fetchChangesFeedBySup(that.priorTime);
        listChangesFeed[0]['content'].forEach(cf => {
            switch (cf['thaoTac']) {
                case 'TẠO MỚI':
                    listCreatedFlyPlanIDs.push(cf.eventId);
                    break;
                case 'CẬP NHẬT':
                    listUpdatedFlyPlanIDs.push(cf.eventId);
                    break;
                case 'XÓA':
                    listDeletedFlyPlanIDs.push(cf.eventId);
                    break;
                default:
                break;
            }
        });
        listCreatedFlyPlanIDs = that.filterCalSrv.filterIDsByOtherIDs(listCreatedFlyPlanIDs, listDeletedFlyPlanIDs)
        listCreatedFlyPlanIDs = that.helperSrv.filterDuplicateItemByID(listCreatedFlyPlanIDs);
        listUpdatedFlyPlanIDs = that.filterCalSrv.filterIDsByOtherIDs(listUpdatedFlyPlanIDs, listDeletedFlyPlanIDs)
        listUpdatedFlyPlanIDs = that.helperSrv.filterDuplicateItemByID(listUpdatedFlyPlanIDs);
        if (listCreatedFlyPlanIDs.length) {
            that.fetchCreatedFlyPlan(listCreatedFlyPlanIDs);
        }
        if (listUpdatedFlyPlanIDs.length) {
            that.fetchUpdatedFlyPlan(listUpdatedFlyPlanIDs);
        }
        if (listDeletedFlyPlanIDs.length) {
            that.deleteFlyPlan(listDeletedFlyPlanIDs);
        }
    }

    private async fetchCreatedFlyPlan(ids) {
        // fetch moi event co id nam trong ids
        let eventsPromise = await this.lichbaySrv.fetchFlyPlanByIDs(ids);
        eventsPromise.forEach(e => {
            let event = new LichTapBay(e.id, e.ghiChu, new Date(e.thoiGianBatDau), new Date(e.thoiGianKetThuc),
                                        e.noiDung, e.trangThai, e.nguoiDangKy, e.nhaCungCap, e.nhaCungCap.id,
                                        e.diaDiemBay, e.diaDiemBay.id, e.droneDaoTao,  e.droneDaoTao.id);
            this.setStatusEvent(event);

            this.events.push(event);
        });
        this.dataSrv.setItem('LichTapBayLocal', this.events);
        this.reloadDataSource();
    }

    private async fetchUpdatedFlyPlan(ids) {
        // xoa nhung event co id nam trong ids
        this.events = this.filterCalSrv.filterEventsByID(this.events, ids);
        this.reloadDataSource();
        // fetch moi event co id nam trong ids
        let eventsPromise = await this.lichbaySrv.fetchFlyPlanByIDs(ids);
        eventsPromise.forEach(e => {
            let event = new LichTapBay(e.id, e.ghiChu, new Date(e.thoiGianBatDau), new Date(e.thoiGianKetThuc),
                                        e.noiDung, e.trangThai, e.nguoiDangKy, e.nhaCungCap, e.nhaCungCap.id,
                                        e.diaDiemBay, e.diaDiemBay.id, e.droneDaoTao,  e.droneDaoTao.id);
            this.setStatusEvent(event);
            this.events.push(event);
        });
        this.dataSrv.setItem('LichTapBayLocal', this.events);
        this.reloadDataSource();
    }

    private deleteFlyPlan(ids) {
        // xoa nhung event co id nam trong ids
        this.events = this.filterCalSrv.filterEventsByID(this.events, ids);
        this.dataSrv.setItem('LichTapBayLocal', this.events);
        this.reloadDataSource();
    }

    public async updateChangesFeedFlyPlanByUser(that) {
        let key = 'priorTime';
        that.priorTime = that.dataSrv.getItem(key);
        if (!that.priorTime) {
        that.priorTime = (new Date()).toISOString();
        }
        that.dataSrv.setItem(key, (new Date()).toISOString());
        let listUpdatedFlyPlanIDs: Array<number> = [];
        let listChangesFeed = await that.changesFeedSrv.fetchChangesFeedByUser(that.priorTime);
        listChangesFeed[0]['content'].forEach(cf => {
            listUpdatedFlyPlanIDs.push(cf.lichTapBayId);
        });
        listUpdatedFlyPlanIDs = that.helperSrv.filterDuplicateItemByID(listUpdatedFlyPlanIDs);
        if (listUpdatedFlyPlanIDs.length) {
            that.fetchUpdatedFlyPlan(listUpdatedFlyPlanIDs);
        }
    }

    gotoDate($event, scheduleObj) {
        let currentViewDate = new Date(scheduleObj.getCurrentViewDates()[15]);
        let miniCalendarDate = new Date($event.value);
        if (currentViewDate.getFullYear() !=  miniCalendarDate.getFullYear()||
            currentViewDate.getMonth() != miniCalendarDate.getMonth()) {
            this.selectedDate = $event.value;
        }
    }

    // set color for event
    oneventRendered(args: EventRenderedArgs): void {
        if (this.userSrv.isSup) {
            this.scheduleObj.allowDragAndDrop = false;
        }
        let categoryColor: string = args.data.CategoryColor as string;
        if (!args.element || !categoryColor) {
            return;
        }
        if (this.scheduleObj.currentView === 'Agenda') {
            (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
        } else {
            args.element.style.backgroundColor = categoryColor;
        }
    }

    public onPopupOpen(args: PopupOpenEventArgs): void {
        if (args.type == 'Editor' && args.data['Id']) {
            if (args.data['typeOfEvent'] == 'LichTapBay') {
                this.isLichTapBay = true;
                this.isIssue = false;
                this.isNewLichTapBay = false;
                this.isNewIssue = false;
                this.selectedLichTapBayData = args.data;
                
            } else {
                this.isIssue = true;
                this.isLichTapBay = false;
                this.isNewLichTapBay = false;
                this.isNewIssue = false;
                this.selectedIssueData = args;
            }
        }
        if (args.type == 'Editor' && !args.data['Id']) {
            if (this.userSrv.isUser) {
                this.isNewLichTapBay = true;
                this.isNewIssue = false;
                this.isLichTapBay = false;
                this.isIssue = false;
            } else {
                this.isNewIssue = true;
                this.isNewLichTapBay = false;
                this.isLichTapBay = false;
                this.isIssue = false;
            }
        }
    }

    public onActionComplete(args) {
        switch (args.requestType) {
            case "eventChanged":
                this.saveEvent(args.data);
                break;
            case "eventCreated":
                this.createEvent(args.data);
                break;
            case "eventRemoved":
                this.deleteEvent(args.data);
                break;
            default:
                break;
        }
    }

    //#region edit Event chung 
    private saveEvent(event){
        if (this.userSrv.isUser) {
            this.saveChangedFlyPlanByUser(event);
        }
        if (this.userSrv.isSup) {
            if (event.typeOfEvent == "LichTapBay") {
                this.saveChangedFlyPlanBySup(event);
            }
            if (event.typeOfEvent == "Issue") {
                this.saveChangedIssue(event);
            }
        }
    }

    private saveChangedFlyPlanByUser(event) {
        if (!this.lichbaySrv.isStartedOrCancelledEvent(event.status)) { // neu event khong phai trang thai started hoac cancelled thi co the SAVE
            let statusEvent =this.lichbaySrv.getLichBayStatusName1(event.status); //TV -> TA
            // Tạo object để lưu lên server với trạng thái = tiếng anh
            let lichbayServer = this.lichbaySrv.createChangedLichTapBayObject(event, statusEvent);
            this.lichbaySrv.saveLichTapBayToServer(lichbayServer).subscribe(
                (lichtapbay) => {
                },
                (error: any) => { console.log(error) }
              );
            // Tạo object để lưu tại Local với trạng thái = tiếng việt
            let lichTapBayLocal = this.lichbaySrv.saveLichTapBayToLocalByUser(lichbayServer);
            this.setStatusEvent(lichTapBayLocal);
            // remove event có cùng id nhưng sai thông tin (được add tự động)
            this.removeLichTapBay(event);
            // hiển thị lên giao diện event mới
            this.addEvent(lichTapBayLocal);
            this.reloadDataSource();
        }
    }
    private saveChangedFlyPlanBySup(event) {
        let status =this.lichbaySrv.getLichBayStatusName2(event.status); // id -> eName
        let lichbayServer = this.lichbaySrv.createChangedLichTapBayObject(event, status);
        this.lichbaySrv.saveLichTapBayToServer(lichbayServer).subscribe(
            (lichtapbay) => {
            },
            (error: any) => { console.log(error) }
          );
        let lichTapBayLocal = this.lichbaySrv.saveLichTapBayToLocalBySup(event, status);
        this.setStatusEvent(lichTapBayLocal);
        this.removeLichTapBay(event);
        this.addEvent(lichTapBayLocal);
        this.reloadDataSource();
    }
    //#endregion

    //#region Create LichTapBay
    private createEvent(event) {
        if (this.userSrv.isUser) {
            this.createNewFlyPlan(event);
        }
        if (this.userSrv.isSup) {
            this.createNewIssue(event);
        }
    }

    private async createNewFlyPlan(event) {
        let lichbayServer = this.lichbaySrv.createNewLichTapBayToServer(event);
        this.lichbaySrv.saveLichTapBayToServer(lichbayServer).subscribe(
            (lichtapbay) => {
                let lichTapBayLocal = this.lichbaySrv.createNewLichTapBayToLocal(lichtapbay);
                this.removeLichTapBay(event);
                this.addEvent(lichTapBayLocal);
                this.dataSrv.setItem('LichTapBayLocal', this.events);
                this.reloadDataSource();
            },
            (error: any) => { console.log(error) }
          );
    }
    //#endregion

    //#region Delete LichTapBay
    private deleteEvent(events) {
        if (this.userSrv.isUser) {
            events.forEach(event => {
                this.lichbaySrv.deleteLichTapBayToServer(event.Id).subscribe(e => console.log(e));
                this.removeLichTapBay(event);
            }); 
            // this.reloadDataSource();
        }
        if (this.userSrv.isSup) {
            events.forEach(event => {
                this.issueSrv.deleteIssueToServer(event.Id).subscribe(e => console.log(e));
                this.removeIssue(event);
            });
            // this.reloadDataSource();
        }
        this.dataSrv.setItem('LichTapBayLocal', this.events);
    }
    //#endregion

    private saveChangedIssue(event) {
        // Tạo object để lưu lên server với trạng thái = tiếng anh
        let issueServer = this.issueSrv.createChangedIssueObject(event);
        this.issueSrv.saveIssueToServer(issueServer);
    }

    public createNewIssue(event) {
        let issueServer = this.issueSrv.createNewIssueToServer(event);
        this.issueSrv.saveIssueToServer(issueServer);
        let issueLocal = this.issueSrv.createNewIssueToLocal(event);
        this.removeIssue(event);
        this.addEvent(issueLocal);
        this.reloadDataSource();
    }

    private addEvent(event) {
        this.events.push(event)
        this.dataSrv.setItem('LichTapBayLocal', this.events);
    }

    private removeLichTapBay(e) {
        this.events = this.events.filter(function(event){
            return event.TypeOfEvent == 'Issue' || event.Id != e.Id
        });
        this.dataSrv.setItem('LichTapBayLocal', this.events);
    }

    private removeIssue(e) {
        this.events = this.events.filter(function(event){
            return  event.TypeOfEvent == 'LichTapBay' || event.Id != e.Id
        });
        this.dataSrv.setItem('LichTapBayLocal', this.events);
    }

    private reloadDataSource() {
        this.eventSettings = {
            dataSource: <Object[]>extend([], this.events, null, true),
            enableTooltip: true,
            tooltipTemplate: this.temp
        };
    }

    receiveMessage(event) {
        console.log(event)
        this.eventSettings = event;
    }

    public filterAll() {
        this.events = this.dataSrv.getItem('eventsList')
        if (this.selectedDrone && this.selectedDrone.length) {
            this.events = this.filterCalSrv.filterDrone(this.events, this.selectedDrone);
        }
        if (this.selectedPlace && this.selectedPlace.length) {
            this.events = this.filterCalSrv.filterPlace(this.events, this.selectedPlace);
        }
        if (this.selectedStatus && this.selectedStatus.length) {
            this.events = this.filterCalSrv.filterStatusLichBay(this.events, this.selectedStatus);
        }
        this.reloadDataSource();
    }
}
