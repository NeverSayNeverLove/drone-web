import { Component, ViewEncapsulation, OnInit, ViewChild, OnChanges } from '@angular/core';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { DateTimePicker } from '@syncfusion/ej2-calendars';
import { ScheduleComponent, EventSettingsModel, View, EventRenderedArgs, WorkHoursModel, PopupOpenEventArgs } from '@syncfusion/ej2-angular-schedule';
import { extend } from '@syncfusion/ej2-base';
import $ from "jquery";

import { LichtapbayService, LichTapBay } from '../services/lichtapbay.service';
import { DronedaotaoService, DroneDaoTao } from '../services/dronedaotao.service';
import { DiadiembayService, DiaDiemBay } from '../services/diadiembay.service';
import { UserService, User } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import {Router} from '@angular/router';
import { Issue } from '../services/issue.service.service';

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
    // maps the appropriate column to fields property
    public default : string = 'Default';

    // Cac thanh phan cua edit template
    dropDownListObject: DropDownList;

    constructor(private lichbaySrv: LichtapbayService,
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

        console.log('current User calendar', currentUser);
     
        this.getItem(currentUser);
    
        this.fieldsDrone = { text: 'tenDrone', value: 'id' };
        this.fieldsStatus = { text: 'name', value: 'id' };
        this.fieldsPlace = { text: 'diaChi', value: 'id' };
    }

    getItem(currentUser) {
        switch (currentUser['vai_tro_id']) {
            case 3:
                this.placeList = this.dataSrv.getItem('placeTraning_Cus');
                this.droneList = this.dataSrv.getItem('droneTraing_Cus');
                this.events = this.dataSrv.getItem('eventsList_Cus');
                break;
            case 1:
                this.placeList = this.dataSrv.getItem('placeTraning_Sup');
                this.droneList = this.dataSrv.getItem('droneTraing_Sup');
                this.events = this.dataSrv.getItem('eventsList_Sup');
                break;
            default:
                break;
        }
      
        if (!this.events || !this.placeList || !this.droneList) {
            this.events = [];
            this.placeList = [];
            this.droneList = [];
            this.fetchEvent(currentUser)
            this.fetchDrone(currentUser);
            this.fetchPlace(currentUser);
        } else {
            this.eventSettings = {
            dataSource: <Object[]>extend([], this.events, null, true),
            enableTooltip: true,
            tooltipTemplate: this.temp
            };
        }
    }



    async fetchEvent(currentUser) {
        let eventsPromise;
        switch (currentUser['vai_tro_id']) {
            case 3:
                eventsPromise = await this.lichbaySrv.fetchFlyPlanByUserID(currentUser['id']);
                break;
            case 1:
                eventsPromise = await this.lichbaySrv.fetchFlyPlanByNccId(currentUser['id']);
                break;
            default:
                break;
        }
        // console.log('event', eventsPromise);
        eventsPromise.forEach(eventList => {
            eventList['content'].forEach(e => {
                console.log('lich:', e);
                let event = new LichTapBay(e.id, e.ghiChu, new Date(e.thoiGianBatDau), new Date(e.thoiGianKetThuc),
                                            e.ghiChu, e.trangThai, e.nguoiDangKy, e.nhaCungCap, e.diaDiemBay);
                this.setStatusEvent(event);
                this.events.push(event);
            });
        });
        
        switch (currentUser['vai_tro_id']) {
            case 3:
                this.dataSrv.setItem('eventsList_User', this.events);
                break;
            case 1:
                this.dataSrv.setItem('eventsList_Sup', this.events);
                break;
            default:
                break;
        }
       
        this.eventSettings = {
        dataSource: <Object[]>extend([], this.events, null, true),
        enableTooltip: true,
        tooltipTemplate: this.temp
        };
    }

    async fetchDrone(currentUser) {
        let dronesPromise: any;
        switch (currentUser['vai_tro_id']) {
            case 3:
                dronesPromise = await this.droneSrv.fetchAllDrone();
                break;
            case 1:
                dronesPromise = await this.droneSrv.fetchDroneByNccId(currentUser['id']);
                break;
            default:
                break;
        }

        dronesPromise.forEach(droneList => {
            droneList['content'].forEach(dr => {
                console.log(dr);
                let drone = new DroneDaoTao(dr.tenDrone, dr.moTa, dr.id, dr.maDrone, dr.nhaCungCap);
                this.droneList.push(drone);
            });
        });

        switch (currentUser['vai_tro_id']) {
            case 3:
                this.dataSrv.setItem('droneTraning_User', this.droneList);                
                break;
            case 1:
                this.dataSrv.setItem('droneTraning_Sup', this.droneList);                
                break
            default:
                break;
        }
    }

    async fetchPlace(currentUser) {
        let placesPromise;
        switch (currentUser['vai_tro_id']) {
            case 3:
                placesPromise = await this.placeSrv.fetchAllPlace();
                break;
            case 1:
                placesPromise = await this.placeSrv.fetchFlyPlaceByNccId(currentUser['id']);
                break;
        
            default:
                break;
        }

        placesPromise.forEach(droneList => {
            droneList['content'].forEach(pl => {
                let place = new DiaDiemBay(pl.diaChi, pl.id, pl.nhaCungCap);
                this.placeList.push(place);
            });
        });

        switch (currentUser['vai_tro_id']) {
            case 3:
                this.dataSrv.setItem('placeTraning_Cus', this.placeList);
                break;
            case 1:
                this.dataSrv.setItem('placeTraning_Sup', this.placeList);
                break;
            default:
                break;
        }
        
       
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
        console.log(args);
        if (args.type === 'Editor' && args.data['Id']) { // truong hop la edit event
            let statusElement: HTMLInputElement = args.element.querySelector('#EventStatus') as HTMLInputElement;
            statusElement.readOnly = true;
            let titleElement: HTMLInputElement = args.element.querySelector('#EventTitle') as HTMLInputElement;
            let descriptionElement: HTMLInputElement = args.element.querySelector('#EventDescription') as HTMLInputElement;
            if (statusElement.value == this.statusList[2].name || statusElement.value == this.statusList[3].name) {
                titleElement.readOnly = true;
                descriptionElement.readOnly = true;
            } else {
                titleElement.readOnly = false;
                descriptionElement.readOnly = false;
            }
            // if (!statusElement.classList.contains('e-dropdownlist')) {
            //     let dropDownListObject: DropDownList = new DropDownList({
            //         placeholder: 'Choose status', value: statusElement.value,
            //         dataSource: [this.statusList[0].name, this.statusList[1].name, 
            //                     this.statusList[2].name, this.statusList[3].name]
            //     });
            //     dropDownListObject.appendTo(statusElement);
            //     statusElement.setAttribute('name', 'status');
            // }

            this.renderStartTimeElement(args, statusElement)
            this.renderEndTimeElement(args, statusElement)
            this.renderPlaceElement(args)

        }
    }

    private renderStartTimeElement(args, statusElement) {
        let startElement: HTMLInputElement = args.element.querySelector('#StartTime') as HTMLInputElement;
        if (!startElement.classList.contains('e-datetimepicker')) {
            if (statusElement.value == this.statusList[2].name || statusElement.value == this.statusList[3].name) {
                new DateTimePicker({ value: new Date(startElement.value) || new Date(), readonly:true}, startElement);
            } else {
                new DateTimePicker({ value: new Date(startElement.value) || new Date(), readonly:false }, startElement);
            }
        } else {
            if (statusElement.value == this.statusList[2].name || statusElement.value == this.statusList[3].name) {
                // new DateTimePicker({ value: new Date(startElement.value) || new Date()});
                // $("#StartTime").prop("readonly", true);
                startElement.readOnly = true;
            } else {
                // new DateTimePicker({ value: new Date(startElement.value) || new Date()});
                // $("#StartTime").prop("readonly", false);
                startElement.readOnly = false;
            }
        }
    }

    private renderEndTimeElement(args, statusElement) {
        let endElement: HTMLInputElement = args.element.querySelector('#EndTime') as HTMLInputElement;
        if (!endElement.classList.contains('e-datetimepicker')) {
            if (statusElement.value == this.statusList[2].name || statusElement.value == this.statusList[3].name) {
                new DateTimePicker({ value: new Date(endElement.value) || new Date(), readonly:true }, endElement);
            } else {
                new DateTimePicker({ value: new Date(endElement.value) || new Date(), readonly:false }, endElement);
            }
        } else {
            if (statusElement.value == this.statusList[2].name || statusElement.value == this.statusList[3].name) {
                endElement.readOnly = true;
            } else {
                endElement.readOnly = false;
            }
        }
    }

    private renderPlaceElement(args) {
        let placeElement: HTMLInputElement = args.element.querySelector('#EventPlace') as HTMLInputElement;
        let placeNameList = this.placeSrv.getPlaceNameList();
        console.log('adhfaksdjfhasjf', args.data['diaDiemBay']['diaChi']);
        // let placeName = placeNameList[];
        // Cần lấy được placeName của chính event dc click.
        
        if (!placeElement.classList.contains('e-dropdownlist')) {
            this.dropDownListObject = new DropDownList({
                placeholder: 'Choose place', value: args.data['diaDiemBay']['diaChi'],
                dataSource: placeNameList
            });
            this.dropDownListObject.appendTo(placeElement);
            placeElement.setAttribute('name', 'EventPlace');
        } else {
            this.dropDownListObject.value = args.data.diaDiemBay.diaChi;
        }
    }

    filterAll($event) {
        this.filterDrone();
        this.filterPlace();
        this.filterStatus();
        console.log($event);
    }
    filterDrone() {
        console.log('drone', this.selectedDrone);
    }
    filterPlace() {
        console.log('place', this.selectedPlace);
    }
    filterStatus() {
        console.log('status', this.selectedStatus);
    }
}
