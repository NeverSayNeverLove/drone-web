import { Component, ViewEncapsulation, OnInit, ViewChild, OnChanges, Input } from '@angular/core';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { DateTimePicker } from '@syncfusion/ej2-calendars';
import { ScheduleComponent, EventSettingsModel, View, EventRenderedArgs, WorkHoursModel, PopupOpenEventArgs } from '@syncfusion/ej2-angular-schedule';
import { extend } from '@syncfusion/ej2-base';
import $ from "jquery";
import { L10n } from '@syncfusion/ej2-base';

import { LichtapbayService, LichTapBay } from '../services/lichtapbay.service';
import { DronedaotaoService, DroneDaoTao } from '../services/dronedaotao.service';
import { DiadiembayService, DiaDiemBay } from '../services/diadiembay.service';
import { UserService, User } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import {Router} from '@angular/router';
import { Issue, IssueService } from '../services/issue.service.service';

L10n.load({
    'en-US': {
        'schedule': {
            'saveButton': 'Lưu',
            'cancelButton': 'Đóng',
            'deleteButton': 'Xóa',
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
  styleUrls: ['./user-calendar.component.scss']
})
export class UserCalendarComponent implements OnInit, OnChanges {
    @ViewChild('scheduleObj')
    public scheduleObj: ScheduleComponent;
    public selectedDate: Date = new Date();
    public scheduleView: View = 'Month';
    public events: any[] = [];
    public workHours: WorkHoursModel = { highlight: false };
    public startHour: string = '06:00';
    public endHour: string = '17:00';
    public allowMultiple: Boolean = true;
    public temp: string = '<div class="tooltip-wrap">' +
    '<div class="content-area"><div class="name">${Subject}</></div>' +
    '<div class="time">From&nbsp;:&nbsp;${StartTime.toLocaleString()} </div>' +
    '<div class="time">To&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;${EndTime.toLocaleString()} </div></div></div>';
    eventSettings: EventSettingsModel;
    
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

    public teacherList: any[] = [];
    public fieldsTeacher: any;
    public placeholderTeacher: string = "Lựa chọn giáo viên";
    
    public statusList: any[] = [
      {id: 1, name: "Đang chờ", eName: "waiting"},
      {id: 2, name: "Đã chấp nhận", eName: "accepted"},
      {id: 3, name: "Đang diễn ra", eName: "started"},
      {id: 4, name: "Đã hủy", eName: "cancelled"}
    ];
    public fieldsStatus: any;
    public placeholderStatus: string = "Lựa chọn trạng thái";

    public selectedDrone: any;
    public selectedStatus: any;
    public selectedPlace: any;

    // ngModel - data binding in template event edit 
    public eventDescription: string;
    public eventStartTime: Date;
    public eventEndTime: Date;
    public eventStatus: string;
    public eventPlace: string;
    public placeNameList;
    // maps the appropriate column to fields property
    public default : string = 'Default';

    constructor(private lichbaySrv: LichtapbayService,
        private issueSrv: IssueService,
        private droneSrv: DronedaotaoService,
        private placeSrv: DiadiembayService,
        private userSrv: UserService,
        private authSrv: AuthService,
        private dataSrv: DataService,
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

    ngOnChanges() {
        console.log('ok')
    }

    ngOnDestroy(): void {
        console.log(this.dataSrv.getItem('placeTraning'));
        console.log(this.dataSrv.getItem('droneTraing'));
        console.log(this.dataSrv.getItem('eventsList'));
    }

    initItems(currentUser) {
        // console.log('current User calendar', currentUser, this.userSrv.isSup);
     
        this.getItem(currentUser);
    
        this.fieldsDrone = { text: 'tenDrone', value: 'id' };
        this.fieldsStatus = { text: 'name', value: 'id' };
        this.fieldsPlace = { text: 'diaChi', value: 'id' };
    }

    getItem(currentUser) {
        // if (this.userSrv.isSup) {
        //     this.placeList = this.dataSrv.getItem('placeTraning_Sup');
        //     this.droneList = this.dataSrv.getItem('droneTraing_Sup');
        //     this.events = this.dataSrv.getItem('eventsList_Sup');
        // }
        // if (this.userSrv.isUser) {
        //     this.placeList = this.dataSrv.getItem('placeTraning');
        //     this.droneList = this.dataSrv.getItem('droneTraing');
        //     this.events = this.dataSrv.getItem('eventsList');
        // }
      
        // if (!this.events || !this.placeList || !this.droneList) {
        //     this.events = [];
        //     this.placeList = [];
        //     this.droneList = [];
        //     this.fetchEvent(currentUser)
        //     this.fetchDrone(currentUser);
        //     this.fetchPlace(currentUser);
        // } else {
        //     this.eventSettings = {
        //     dataSource: <Object[]>extend([], this.events, null, true),
        //     enableTooltip: true,
        //     tooltipTemplate: this.temp
        //     };
        // }
        this.fetchEvent(currentUser)
        this.fetchDrone(currentUser);
        this.fetchPlace(currentUser);
    }



    async fetchEvent(currentUser) {
        let eventsPromise;
        let issuePromise;
        
        // User or Sup
        if (this.userSrv.isUser) {
            eventsPromise = await this.lichbaySrv.fetchFlyPlanByUserID(currentUser['id']);
        } else {
            eventsPromise = await this.lichbaySrv.fetchFlyPlanByNccId(currentUser['id']);
            issuePromise = await this.issueSrv.fetchIssue(currentUser['id']);           
        }
        
        // console.log('event', eventsPromise);
        eventsPromise.forEach(eventList => {
            eventList['content'].forEach(e => {
                console.log('eventtttttt :', e);
                let event = new LichTapBay(e.id, e.ghiChu, new Date(e.thoiGianBatDau), new Date(e.thoiGianKetThuc),
                                            e.noiDung, e.trangThai, e.nguoiDangKy, e.nhaCungCap, e.diaDiemBay, e.droneDaoTao);
                this.setStatusEvent(event);
                // console.log('lichtapbay: :', event);
                this.events.push(event);
            });
        });

        // console.log("issue", issuePromise);
        issuePromise.forEach(issueList => {
            issueList['content'].forEach(i => {
                //started
                // if(i.thoiGianBatDau && !i.thoiGianKetThuc){
                //     let issue = new Issue(i.id, "Started", new Date(i.thoiGianBatDau), new Date(),new Date(i.duTinhBatDau),
                //     new Date(i.duTinhKetThuc), i.moTa,i.nhaCungCap);
                //     console.log('stared',issue);
                //     this.events.push(issue);
                // }
                //ended
                // if(i.thoiGianBatDau && i.thoiGianKetThuc){
                //     let issue = new Issue(i.id, "Ended", new Date(i.thoiGianBatDau), new Date(),new Date(i.duTinhBatDau),
                //     new Date(i.duTinhKetThuc), i.moTa, i.nhaCungCap);
                //     this.events.push(issue);
                // }
                // //planed
                    console.log("Planned issue out", i);
                if(i.duTinhBatDau && i.duTinhKetThuc && !i.thoiGianBatDau && !i.thoiGianKetThuc){
                    console.log("Planned issue in", i);
                    let issue = new Issue(i.id, "Planed", new Date(i.thoiGianBatDau), new Date(),new Date(i.duTinhBatDau),
                    new Date(i.duTinhKetThuc), i.moTa, i.nhaCungCap);
                    this.events.push(issue);
                }
            });
        })
        
        // User or Sup
        this.userSrv.isUser ? this.dataSrv.setItem('eventsList', this.events) :
            this.dataSrv.setItem('eventsList_Sup', this.events);
       
        this.eventSettings = {
        dataSource: <Object[]>extend([], this.events, null, true),
        enableTooltip: true,
        tooltipTemplate: this.temp
        };
    }

    async fetchDrone(currentUser) {
        let dronesPromise: any;

        // User or Sup
        dronesPromise = this.userSrv.isUser? await this.droneSrv.fetchAllDrone():
        await this.droneSrv.fetchDroneByNccId(currentUser['id']);
        
        dronesPromise.forEach(droneList => {
            droneList['content'].forEach(dr => {
                // console.log(dr);
                let drone = new DroneDaoTao(dr.tenDrone, dr.moTa, dr.id, dr.maDrone, dr.nhaCungCap);
                this.droneList.push(drone);
            });
        });

        // User or Sup
        this.userSrv.isUser? this.dataSrv.setItem('droneTraning', this.droneList):
        this.dataSrv.setItem('droneTraning_Sup', this.droneList);                

        
    }

    async fetchPlace(currentUser) {
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
        this.userSrv.isUser? this.dataSrv.setItem('placeTraning', this.placeList):
                             this.dataSrv.setItem('placeTraning_Sup', this.placeList);
       
    }

    setStatusEvent(event: LichTapBay) {
        switch (event.status) {
            case this.statusList[0].eName:
                event.status = this.statusList[0].name
                this.setStatusPlanned(event);
                break;
            case this.statusList[1].eName:
                event.status = this.statusList[1].name
                this.setStatusAccepted(event);
                break;
            case this.statusList[2].eName:
                event.status = this.statusList[2].name
                this.setStatusStarted(event);
                break;
            case this.statusList[3].eName:
                event.status = this.statusList[3].name
                this.setStatusRejected(event);
                break;
            default:
                break;
        }
    }

    setStatusPlanned(event: LichTapBay) {
        event.CategoryColor = "#f57f17";
        // event.IsReadonly = false;
    }

    setStatusAccepted(event: LichTapBay) {
        event.CategoryColor = "#7fa900";
        // event.IsReadonly = false;
    }

    setStatusStarted(event: LichTapBay) {
        event.CategoryColor = "#00bdae";
        // event.IsReadonly = true;
    }

    setStatusRejected(event: LichTapBay) {
        event.CategoryColor = "#58585a";
        // event.IsReadonly = true;
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
        // console.log(args);
        if (args.type === 'Editor') {
            this.eventDescription = args.data['description'];
            this.eventStartTime = args.data['StartTime'];
            this.eventEndTime = args.data['EndTime'];
            this.eventStatus = args.data['status'];
            this.placeNameList = this.placeSrv.getPlaceNameList();
            this.eventPlace = args.data['diaDiemBay']['diaChi'];
            let titleElement: HTMLInputElement = args.element.querySelector('#EventTitle') as HTMLInputElement;
            let descriptionElement: HTMLInputElement = args.element.querySelector('#EventDescription') as HTMLInputElement;
            if (this.eventStatus == this.statusList[2].name || this.eventStatus == this.statusList[3].name) {
                titleElement.readOnly = true;
                descriptionElement.readOnly = true;
                this.startTimeElement.readonly = true;
                this.endTimeElement.readonly = true;
                this.eventPlaceElement.readonly = true;
            } else {
                titleElement.readOnly = false;
                descriptionElement.readOnly = false;
                this.startTimeElement.readonly = false;
                this.endTimeElement.readonly = false;
                this.eventPlaceElement.readonly = false;
            }
        }
    }

    public onActionComplete(args) {
        // console.log(args);
        switch (args.requestType) {
            case "eventChanged":
                this.saveFlyPlan(args.data);
                break;
            case "eventCreated":
                this.createFlyPlan(args.data);
                break;
            default:
                break;
        }
    }

    private saveFlyPlan(event) {
        let statusEvent
        // console.log('save event', event)
        if (!this.isStartedOrCancelledEvent(event)) { // neu event khong phai trang thai started hoac cancelled thi co the SAVE
            switch (event.status) {
                case this.statusList[0].name:
                    statusEvent = this.statusList[0].eName
                    break;
                case this.statusList[1].name:
                    statusEvent = this.statusList[1].eName
                    break;
                case this.statusList[2].name:
                    statusEvent = this.statusList[2].eName
                    break;
                case this.statusList[3].name:
                    statusEvent = this.statusList[3].eName
                    break;
                default:
                    break;
            }
            let lichtapbay = {
                "id": event.Id,
                "nhaCungCapId": event.nhaCungCap.id,
                "nguoiDangKyId": event.nguoiDangKy.id,
                "droneDaoTaoId": event.droneDaoTao.id,
                "diaDiemBayId": event.diaDiemBay.id,
                "thoiGianBatDau": event.StartTime,
                "thoiGianKetThuc": event.EndTime,
                "trangThai": statusEvent,
                "ghiChu": event.Subject,
                "noiDung": event.Description
            }
        }

        // this.lichbaySrv.createLichTapBay(lichtapbay).subscribe(
        //     (lichtapbay: LichTapBay) => {console.log(lichtapbay)},
        //     (error: any) => {console.log(error)}
        // );
    }

    // check xem event co phai o trang thai Started hoac Cancelled
    private isStartedOrCancelledEvent(event): boolean {
        return event.status == this.statusList[2].name || event.status == this.statusList[3].name
    }

    private createFlyPlan(event) {
        let statusEvent
        switch (event.status) {
            case this.statusList[0].name:
                statusEvent = this.statusList[0].eName
                break;
            case this.statusList[1].name:
                statusEvent = this.statusList[1].eName
                break;
            case this.statusList[2].name:
                statusEvent = this.statusList[2].eName
                break;
            case this.statusList[3].name:
                statusEvent = this.statusList[3].eName
                break;
            default:
                break;
        }
        let lichtapbay = {
            "nhaCungCapId": event.nhaCungCap.id,
            "nguoiDangKyId": event.nguoiDangKy.id,
            "droneDaoTaoId": event.droneDaoTao.id,
            "diaDiemBayId": event.diaDiemBay.id,
            "thoiGianBatDau": event.StartTime,
            "thoiGianKetThuc": event.EndTime,
            "trangThai": statusEvent,
            "ghiChu": event.Subject,
            "noiDung": event.Description
        }

        // this.lichbaySrv.createLichTapBay(lichtapbay).subscribe(
        //     (lichtapbay: LichTapBay) => {console.log(lichtapbay)},
        //     (error: any) => {console.log(error)}
        // );
    }

    filterAll($event) {
        this.filterDrone();
        this.filterPlace();
        this.filterStatus();
        // console.log($event);
    }
    filterDrone() {
        // console.log('drone', this.selectedDrone);
    }
    filterPlace() {
        // console.log('place', this.selectedPlace);
    }
    filterStatus() {
        // console.log('status', this.selectedStatus);
    }
}
