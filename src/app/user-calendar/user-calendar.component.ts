import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { DateTimePicker } from '@syncfusion/ej2-calendars';
import { ScheduleComponent, EventSettingsModel, View, EventRenderedArgs, WorkHoursModel, PopupOpenEventArgs } from '@syncfusion/ej2-angular-schedule';
import { extend } from '@syncfusion/ej2-base';

import { LichtapbayService, LichTapBay } from '../services/lichtapbay.service'

@Component({
  selector: 'app-user-calendar',
  templateUrl: './user-calendar.component.html',
  styleUrls: ['./user-calendar.component.scss']
})
export class UserCalendarComponent implements OnInit {
  @ViewChild('scheduleObj')
  public scheduleObj: ScheduleComponent;
  public selectedDate: Date;
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
  public droneTraining: any[];
  // maps the appropriate column to fields property
  public fieldsDrone: any;
  public placeholderDrone: string = 'Drone 1';    
  public default : string = 'Default';

    constructor(private lichbaySrv: LichtapbayService) {}

    ngOnInit() {
    // init list events
    this.initItems();
//     this.events = [
//       {
//           Id: 1,
//           Subject: 'Story Time for Kids',
//           StartTime: new Date(2019, 2, 11, 10, 0),
//           EndTime: new Date(2019, 2, 11, 11, 30),
//           CategoryColor: '#1aaa55'
//       }, {
//           Id: 2,
//           Subject: 'Camping with Turtles',
//           StartTime: new Date(2019, 2, 12, 12, 0),
//           EndTime: new Date(2019, 2, 12, 14, 0),
//           CategoryColor: '#357cd2'
//       }, {
//           Id: 3,
//           Subject: 'Wildlife Warriors',
//           StartTime: new Date(2019, 2, 13, 10, 0),
//           EndTime: new Date(2019, 2, 13, 11, 30),
//           CategoryColor: '#7fa900'
//       }, {
//           Id: 4,
//           Subject: 'Parrot Talk',
//           StartTime: new Date(2019, 2, 14, 9, 0),
//           EndTime: new Date(2019, 2, 14, 10, 0),
//           CategoryColor: '#ea7a57'
//       }, {
//           Id: 5,
//           Subject: 'Birds of Prey',
//           StartTime: new Date(2019, 2, 15, 10, 0),
//           EndTime: new Date(2019, 2, 15, 11, 30),
//           CategoryColor: '#00bdae'
//       }, {
//           Id: 6,
//           Subject: 'Croco World',
//           StartTime: new Date(2019, 2, 16, 12, 0),
//           EndTime: new Date(2019, 2, 16, 14, 0),
//           CategoryColor: '#f57f17'
//       }, {
//           Id: 7,
//           Subject: 'Venomous Snake Hunt',
//           StartTime: new Date(2019, 2, 17, 10, 0),
//           EndTime: new Date(2019, 2, 17, 11, 30),
//           CategoryColor: '#1aaa55'
//       }, {
//           Id: 8,
//           Subject: 'Face Painting & Drawing events',
//           StartTime: new Date(2019, 2, 19, 9, 30),
//           EndTime: new Date(2019, 2, 19, 11, 0),
//           CategoryColor: '#357cd2'
//       }, {
//           Id: 9,
//           Subject: 'Pony Rides',
//           StartTime: new Date(2019, 2, 21, 11, 0),
//           EndTime: new Date(2019, 2, 21, 13, 0),
//           CategoryColor: '#7fa900'
//       }, {
//           Id: 10,
//           Subject: 'Feed the Giants',
//           StartTime: new Date(2019, 2, 22, 9, 30),
//           EndTime: new Date(2019, 2, 22, 11, 0),
//           CategoryColor: '#ea7a57'
//       }, {
//           Id: 11,
//           Subject: 'Jungle Treasure Hunt',
//           StartTime: new Date(2019, 2, 9, 10, 0),
//           EndTime: new Date(2019, 2, 9, 11, 30),
//           CategoryColor: '#00bdae'
//       }, {
//           Id: 12,
//           Subject: 'Endangered Species Program',
//           StartTime: new Date(2019, 2, 7, 10, 30),
//           EndTime: new Date(2019, 2, 7, 12, 30),
//           CategoryColor: '#f57f17'
//       }, {
//           Id: 13,
//           Subject: 'Black Cockatoos Playtime',
//           StartTime: new Date(2019, 2, 5, 10, 0),
//           EndTime: new Date(2019, 2, 5, 11, 30),
//           CategoryColor: '#1aaa55'
//       }, {
//           Id: 14,
//           Subject: 'Walk with Jungle King',
//           StartTime: new Date(2019, 2, 14, 12, 0),
//           EndTime: new Date(2019, 2, 14, 14, 0),
//           CategoryColor: '#357cd2'
//       }, {
//           Id: 15,
//           Subject: 'Trained Climbers',
//           StartTime: new Date(2019, 2, 19, 13, 0),
//           EndTime: new Date(2019, 2, 19, 14, 30),
//           CategoryColor: '#7fa900'
//       }, {
//           Id: 16,
//           Subject: 'Playtime with Chimpanzees',
//           StartTime: new Date(2019, 2, 22, 13, 0),
//           EndTime: new Date(2019, 2, 22, 14, 30),
//           CategoryColor: '#ea7a57'
//       }, {
//           Id: 17,
//           Subject: 'Story Time for Kids',
//           StartTime: new Date(2019, 2, 13, 14, 30),
//           EndTime: new Date(2019, 2, 13, 16, 0),
//           CategoryColor: '#1aaa55'
//       }, {
//           Id: 18,
//           Subject: 'Black Cockatoos Playtime',
//           StartTime: new Date(2019, 2, 15, 14, 30),
//           EndTime: new Date(2019, 2, 15, 16, 0),
//           CategoryColor: '#7fa900'
//       }
//   ];
        this.selectedDate = new Date();
        
        this.droneTraining = [
        { Id: 'Game1', Drone: 'American Football' },
        { Id: 'Game2', Drone: 'Badminton' },
        { Id: 'Game3', Drone: 'Basketball' },
        { Id: 'Game4', Drone: 'Cricket' },
        { Id: 'Game5', Drone: 'Football' },
        { Id: 'Game6', Drone: 'Golf' },
        { Id: 'Game7', Drone: 'Hockey' },
        { Id: 'Game8', Drone: 'Rugby' },
        { Id: 'Game9', Drone: 'Snooker' },
        { Id: 'Game10', Drone: 'Tennis' }
        ];
        this.fieldsDrone = { text: 'Drone', value: 'Id' };
    }

    async initItems() {
        // lay thong tin nguoi dung hien tai
        let user_id = 3; // fake data
        let eventsPromise = await this.lichbaySrv.fetchFlyPlanByUserID(3);
        eventsPromise.forEach(eventList => {
            eventList['content'].forEach(e => {
                let event = new LichTapBay(e.id, e.ghiChu, new Date(e.thoiGianBatDau), new Date(e.thoiGianKetThuc), e.ghiChu, e.trangThai);
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
