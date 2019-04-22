import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { DateTimePicker } from '@syncfusion/ej2-calendars';
import { ScheduleComponent, EventSettingsModel, View, EventRenderedArgs, WorkHoursModel, PopupOpenEventArgs } from '@syncfusion/ej2-angular-schedule';
import { extend } from '@syncfusion/ej2-base';

import { LichtapbayService, LichTapBay } from '../services/lichtapbay.service';
import { DronedaotaoService, DroneDaoTao } from '../services/dronedaotao.service';
import { DiadiembayService, DiaDiemBay } from '../services/diadiembay.service';
import { UserService, User } from '../services/user.service';

@Component({
  selector: 'app-user-calendar',
  templateUrl: './user-calendar.component.html',
  styleUrls: ['./user-calendar.component.scss']
})
export class UserCalendarComponent implements OnInit {
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
    public placeholderDrone: string = "select drone";
    public placeList: any[] = [];
    public fieldsPlace: any;
    public placeholderPlace: string = "select place";
    public teacherList: any[] = [];
    public fieldsTeacher: any;
    public placeholderTeacher: string = "select teacher";
    public statusList: any[] = [
      {id: 1, name: "Đang chờ"},
      {id: 2, name: "Đã chấp nhận"},
      {id: 3, name: "Đang diễn ra"},
      {id: 4, name: "Đã hủy"}
    ];
    public fieldsStatus: any;
    public placeholderStatus: string = "select status";
    // maps the appropriate column to fields property
    public default : string = 'Default';

    constructor(private lichbaySrv: LichtapbayService,
        private droneSrv: DronedaotaoService,
        private placeSrv: DiadiembayService,
        private userSrv: UserService) {}

    ngOnInit() {
    // init list events
    this.initItems();
    }

    initItems() {
        // lay thong tin nguoi dung hien tai
        this.fetchEvent()
        this.fetchDrone();
        this.fetchPlace();
        // this.fetchTeacher();
        this.fieldsStatus = { text: 'name', value: 'id' };
    }

    async fetchEvent() {
        let user_id = 3; // fake data
        let eventsPromise = await this.lichbaySrv.fetchFlyPlanByUserID(3);
        // console.log('event', eventsPromise);
        eventsPromise.forEach(eventList => {
            eventList['content'].forEach(e => {
                let event = new LichTapBay(e.id, e.ghiChu, new Date(e.thoiGianBatDau), new Date(e.thoiGianKetThuc), e.ghiChu, e.trangThai, e.nguoiDangKy, e.nhaCungCap);
                this.setStatusEvent(event);
                this.events.push(event);
            });
        });

        this.eventSettings = {
        dataSource: <Object[]>extend([], this.events, null, true),
        enableTooltip: true,
        tooltipTemplate: this.temp
        };
    }

    async fetchDrone() {
        let dronesPromise = await this.droneSrv.fetchAllDrone();
        // console.log('drone', dronesPromise);
        dronesPromise.forEach(droneList => {
            droneList['content'].forEach(dr => {
                let drone = new DroneDaoTao(dr.tenDrone, dr.moTa, dr.id, dr.maDrone, dr.nhaCungCap);
                this.droneList.push(drone);
            });
        });
        this.fieldsDrone = { text: 'tenDrone', value: 'id' };
    }

    async fetchPlace() {
        let placesPromise = await this.placeSrv.fetchAllPlace();
        // console.log('Place', placesPromise);
        placesPromise.forEach(droneList => {
            droneList['content'].forEach(pl => {
                let place = new DiaDiemBay(pl.diaChi, pl.id, pl.nhaCungCap);
                this.placeList.push(place);
            });
        });
        this.fieldsPlace = { text: 'diaChi', value: 'id' };
    }

    async fetchTeacher() {
        let usersPromise = await this.userSrv.fetchAllUser();
        console.log('users:', usersPromise);
    }

    setStatusEvent(event: LichTapBay) {
        switch (event.status) {
            case "1":
                this.setStatusPlanned(event);
                break;
            case "2":
            this.setStatusAccepted(event);
                break;
            case "3":
            this.setStatusStarted(event);
                break;
            case "4":
            this.setStatusRejected(event);
                break;
            default:
                break;
        }
    }

    setStatusPlanned(event: LichTapBay) {
        event.CategoryColor = "#f57f17";
        event.IsReadonly = false;
    }

    setStatusAccepted(event: LichTapBay) {
        event.CategoryColor = "#7fa900";
        event.IsReadonly = false;
    }

    setStatusStarted(event: LichTapBay) {
        event.CategoryColor = "#00bdae";
        event.IsReadonly = true;
    }

    setStatusRejected(event: LichTapBay) {
        event.CategoryColor = "#58585a";
        event.IsReadonly = true;
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
        if (args.type === 'Editor') {
            let statusElement: HTMLInputElement = args.element.querySelector('#EventType') as HTMLInputElement;
            if (!statusElement.classList.contains('e-dropdownlist')) {
                let dropDownListObject: DropDownList = new DropDownList({
                    placeholder: 'Choose status', value: statusElement.value,
                    dataSource: ['New', 'Requested', 'Confirmed']
                });
                dropDownListObject.appendTo(statusElement);
                statusElement.setAttribute('name', 'EventType');
            }

            let startElement: HTMLInputElement = args.element.querySelector('#StartTime') as HTMLInputElement;
            if (!startElement.classList.contains('e-datetimepicker')) {
                new DateTimePicker({ value: new Date(startElement.value) || new Date() }, startElement);
            }
            
            let endElement: HTMLInputElement = args.element.querySelector('#EndTime') as HTMLInputElement;
            if (!endElement.classList.contains('e-datetimepicker')) {
                new DateTimePicker({ value: new Date(endElement.value) || new Date() }, endElement);
            }
        }
    }
}
