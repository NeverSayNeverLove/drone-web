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
import { LichtapbayService, LichTapBay } from '../services/event/lichtapbay.service';
import { DronedaotaoService, DroneDaoTao } from '../services/training/dronedaotao.service';
import { DiadiembayService, DiaDiemBay } from '../services/training/diadiembay.service';
import { UserService, User } from '../services/auth/user.service';
import { AuthService } from '../services/auth/auth.service';
import { DataService } from '../services/helper/data.service';
import { HelperService } from '../services/helper/helper.service'
import { Issue, IssueService } from '../services/event/issue.service.service';
import { FiltercalendarService } from '../services/filter/filtercalendar.service'

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
            'newEvent': 'Đăng kí lịch',
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
    public endHour: string = '17:00';
    public allowMultiple: Boolean = true;
    public temp: string = '<div class="tooltip-wrap">' +
    '<div class="content-area"><div class="name">${Subject}</></div>' +
    '<div class="time">From&nbsp;:&nbsp;${StartTime.toLocaleString()} </div>' +
    '<div class="time">To&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;${EndTime.toLocaleString()} </div></div></div>';
    eventSettings: EventSettingsModel;
    isIssue: boolean = false;
    isLichTapBay: boolean = false;
    isNewLichTapBay: boolean = false;
    loadingData: boolean = true;
    // Cac thanh phan cua edit template
    @ViewChild('StartTime') startTimeElement: DateTimePicker; // thoi gian bat dau trong user-calendar
    @ViewChild('EndTime') endTimeElement: DateTimePicker;// thoi gian ket thuc trong user-calendar
    @ViewChild('EventPlace') eventPlaceElement: DropDownList; // dia diem trong user-calendar

    @ViewChild('plannedRadio') plannedRadioElement: RadioButtonComponent; // 
    @ViewChild('startedRadio') startedRadioElement: RadioButtonComponent; // 
    @ViewChild('endedRadio') endedRadioElement: RadioButtonComponent; // 

    // filter
    public droneList: any[] = [];
    public fieldsDrone: any;
    public placeholderDrone: string = "Lựa chọn drone";

    public placeList: any[] = [];
    public fieldsPlace: any;
    public placeholderPlace: string = "Lựa chọn địa điểm";

    public teacherList: any[] = [];
    public fieldsTeacher: any;
    public placeholderTeacher: string = "Lựa chọn giáo viên";
    
    public fieldsStatus: any;
    public placeholderStatus: string = "Lựa chọn trạng thái";

    public selectedDrone: any;
    public selectedStatus: any;
    public selectedPlace: any;
    public selectedStatusIssue: any;

    // ngModel - data binding in template event edit
    @Input() selectedLichTapBayData: any;
    // currentLichBay: LichTapBay;
    // private eventDescription: string;
    // private eventStartTime: Date;
    // private eventEndTime: Date;
    // private eventTitle: string;

    // ngModel - data binding in issue template edit
    @Input() selectedIssueData: any;

    // maps the appropriate column to fields property
    public default : string = 'Default';
  
    constructor(private lichbaySrv: LichtapbayService,
        private issueSrv: IssueService,
        private droneSrv: DronedaotaoService,
        private placeSrv: DiadiembayService,
        private userSrv: UserService,
        private authSrv: AuthService,
        private dataSrv: DataService,
        private helperSrv: HelperService,
        private filterCalSrv: FiltercalendarService,
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
        console.log(this.dataSrv.getItem('placeTraning'));
        console.log(this.dataSrv.getItem('droneTraing'));
        console.log(this.dataSrv.getItem('eventsList'));
    }

    initItems(currentUser) {
        this.getItem(currentUser);
    
        this.fieldsDrone = { text: 'tenDrone', value: 'id' };
        this.fieldsStatus = { text: 'name', value: 'id' };
        this.fieldsPlace = { text: 'diaChi', value: 'id' };
    }

    getItem(currentUser) {
        this.events = [];
        this.placeList = [];
        this.droneList = [];
        this.fetchEvent(currentUser) // event + issue neu co
        this.fetchDrone(currentUser);
        this.fetchPlace(currentUser);
        if (this.userSrv.isUser) { // neu la user thi ms fetch nha cung cap
            this.fetchAllSup();
        } else {
            this.loadingData = false;
        }
    }

    private async fetchEvent(currentUser) {
        await this.createLichTapBay(currentUser);
        
        if (this.userSrv.isSup) {     
            await this.createIssue(currentUser);
        }
        
        // User or Sup
        this.dataSrv.setItem('events', this.events)
       this.eventsList = JSON.parse(JSON.stringify(this.events));
       this.dataSrv.setItem('eventsList', this.eventsList)
       console.log('fetch', this.eventsList, this.dataSrv.getItem('eventsList'))
        this.eventSettings = {
            dataSource: <Object[]>extend([], this.events, null, true),
            enableTooltip: true,
            tooltipTemplate: this.temp
        };
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
            this.reloadDataSource();
        });
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
                //started
                if(start && !end){
                    let title = this.setTitleIssueStarted(i.moTa);
                    let issue = new Issue(i.id, title, new Date(i.thoiGianBatDau), new Date(), '',
                    '', i.moTa,i.nhaCungCap, 2);
                    // console.log('stared',issue);
                    this.events.push(issue);
                }
                //ended
                if(start && end){
                    let title = this.setTitleIssueEnded(i.moTa);
                    let issue = new Issue(i.id, title, new Date(start), new Date(end), '',
                    '', i.moTa, i.nhaCungCap, 3);
                    this.events.push(issue);
                }
                // //planed
                if(plannedStart && plannedEnd && !start && !end){
                    let title = this.setTitleIssuePlanned(i.moTa);
                    let issue = new Issue(i.id, title, new Date(plannedStart), new Date(plannedEnd), plannedStart,
                    plannedEnd, i.moTa, i.nhaCungCap, 1);
                    this.events.push(issue);
                }
            });
            this.reloadDataSource();
            this.dataSrv.setItem('events', this.events);
            this.eventsList = JSON.parse(JSON.stringify(this.events));
            this.dataSrv.setItem('eventsList', this.eventsList)
        })
    }

    private setTitleIssuePlanned(title: string): string {
        return 'Planned - ' + title
    }

    private setTitleIssueStarted(title: string): string {
        return 'Started - ' + title
    }

    private setTitleIssueEnded(title: string): string {
        return 'Ended - ' + title
    }

    async fetchDrone(currentUser) {
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

    async fetchPlace(currentUser) {
        let placesPromise;
        //User or Sup
        placesPromise = this.userSrv.isUser? await this.placeSrv.fetchAllPlace():
                        await this.placeSrv.fetchFlyPlaceByNccId(currentUser['id']);

                        // console.log('places:', placesPromise)
        placesPromise.forEach(droneList => {
            // console.log('places Promise:', droneList)
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
            // console.log('supList', supList)
            supList['data'].forEach(sup => {
                let newSup = new User(sup.dia_chi, sup.email, sup.ho_ten, sup.id, sup.so_dien_thoai,
                    {id: 1, tenVaiTro: "employee"})
                    supplierList.push(newSup);
            });
            this.loadingData = false;
            this.dataSrv.setItem('SupplierList', supplierList);
        });
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
                this.selectedLichTapBayData = args.data;
                
            } else {
                this.isIssue = true;
                this.isLichTapBay = false;
                this.isNewLichTapBay = false;
                this.selectedIssueData = args;
            }
        }
        if (args.type == 'Editor' && !args.data['Id']) {
            if (this.userSrv.isUser) {
                this.isNewLichTapBay = true;
                this.isLichTapBay = false;
                this.isIssue = false;
            } else {
                this.isNewLichTapBay = false;
                this.isLichTapBay = false;
                this.isIssue = false;
            }
        }
    }

    public onActionComplete(args) {
        switch (args.requestType) {
            case "eventChanged":
                console.log('eventChanged:', args)
                this.saveEvent(args.data);
                break;
            case "eventCreated":
                console.log('eventcreate', args);
                this.createEvent(args.data);
                break;
            case "eventRemoved":
                console.log('eventRemoved', args);
                this.deleteEvent(args.data);
                break;
            default:
                break;
        }
    }

    //#region edit LichTapBay
    private saveEvent(event){
        if (this.userSrv.isUser) {
            this.saveChangedFlyPlan(event);
        }
        if (this.userSrv.isSup) {
            console.log('eventChanged sup', event);
        }
    }

    private saveChangedFlyPlan(event) {
        if (!this.lichbaySrv.isStartedOrCancelledEvent(event.status)) { // neu event khong phai trang thai started hoac cancelled thi co the SAVE
            let statusEvent =this.lichbaySrv.getLichBayStatusName(event.status);
            // Tạo object để lưu lên server với trạng thái = tiếng anh
            let lichbayServer = this.createChangedLichTapBayObject(event, statusEvent);
            this.lichbaySrv.saveLichTapBayToServer(lichbayServer);
            // Tạo object để lưu tại Local với trạng thái = tiếng việt
            let lichTapBayLocal = this.lichbaySrv.saveLichTapBayToLocal(lichbayServer);
            this.setStatusEvent(lichTapBayLocal);
            // remove event có cùng id nhưng sai thông tin (được add tự động)
            this.removeLichTapBay(event);
            // hiển thị lên giao diện event mới
            this.addEvent(lichTapBayLocal);
            this.reloadDataSource();
        }
    }

    private createChangedLichTapBayObject(event, statusEvent): any {
        let diaDiemBayID = event.diaDiemBayID;
        let startTime = this.helperSrv.formatDateTime(event.StartTime);
        let endTime = this.helperSrv.formatDateTime(event.EndTime);
        return {
            "id": event.Id,
            "nhaCungCapId": event.nhaCungCap.id,
            "nguoiDangKyId": event.nguoiDangKy.id,
            "droneDaoTaoId": event.droneDaoTao.id,
            "diaDiemBayId": diaDiemBayID,
            "thoiGianBatDau": startTime,
            "thoiGianKetThuc": endTime,
            "trangThai": statusEvent,
            "ghiChu": event.Subject,
            "noiDung": event.description
        }
    }
    //#endregion

    //#region Create LichTapBay
    private createEvent(event) {
        if (this.userSrv.isUser) {
            this.createNewFlyPlan(event);
        }
        if (this.userSrv.isSup) {
            console.log('eventCreated sup', event);
        }
    }

    private createNewFlyPlan(event) {
        let lichbayServer = this.createNewLichTapBayToServer(event);
        this.lichbaySrv.saveLichTapBayToServer(lichbayServer);
        let lichTapBayLocal = this.lichbaySrv.createNewLichTapBayToLocal(event);
        this.removeLichTapBay(event);
        this.addEvent(lichTapBayLocal);
        this.reloadDataSource();
    }

    private createNewLichTapBayToServer(event): any {
        let startTime = this.helperSrv.formatDateTime(event.StartTime);
        let endTime = this.helperSrv.formatDateTime(event.EndTime);
        return {
            "nhaCungCapId": event.nhaCungCapID,
            "nguoiDangKyId": this.userSrv.getCurrentUser('CurrentUser').id,
            "droneDaoTaoId": event.droneDaoTaoID,
            "diaDiemBayId": event.diaDiemBayID,
            "thoiGianBatDau": startTime,
            "thoiGianKetThuc": endTime,
            "trangThai": this.dataSrv.statusList[0].eName,
            "ghiChu": event.Subject,
            "noiDung": event.description
        }
    }
    //#endregion

    //#region Delete LichTapBay
    private deleteEvent(events) {
        if (this.userSrv.isUser) {
            events.forEach(event => {
                this.lichbaySrv.deleteLichTapBayToServer(event.Id).subscribe(e => console.log(e));
            });
        }
        if (this.userSrv.isSup) {
            console.log(events);
            events.forEach(event => {
                this.issueSrv.deleteIssueToServer(event.Id).subscribe(e => console.log(e));
            });
        }
    }
    //#endregion

    // ======================

    private addEvent(event) {
        this.events.push(event)
    }

    private removeLichTapBay(e) {
        this.events = this.events.filter(function(event){
            return  event.TypeOfEvent == 'Issue' || event.Id != e.Id
        });
    }

    private removeIssue(e) {
        this.events = this.events.filter(function(event){
            return  event.TypeOfEvent == 'LichTapBay' || event.Id != e.Id
        });
    }

    private reloadDataSource() {
        this.eventSettings = {
            dataSource: <Object[]>extend([], this.events, null, true),
            enableTooltip: true,
            tooltipTemplate: this.temp
        };
    }

    // receiveNewLichBay(event) {
    //     this.currentLichBay = event;
    // }

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
