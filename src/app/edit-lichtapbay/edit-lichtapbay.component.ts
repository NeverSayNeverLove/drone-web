import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { LichtapbayService } from '../services/event/lichtapbay.service'
import { DiadiembayService } from '../services/training/diadiembay.service';
import { DateTimePicker } from '@syncfusion/ej2-calendars';
import { DropDownList } from '@syncfusion/ej2-dropdowns';


@Component({
  selector: 'edit-lichtapbay',
  templateUrl: './edit-lichtapbay.component.html',
  styleUrls: ['./edit-lichtapbay.component.sass']
})
export class EditLichtapbayComponent implements OnInit, OnChanges {

  @Input() lichTapBayData: Object ;
  public eventDescription: string;
  public eventStartTime: Date;
  public eventEndTime: Date;
  public eventStatus: string;
  public eventPlace: string;
  public eventTitle: string;
  
  public placeNameList;
  public statusList: any[] = [
    {id: 1, name: "Đang chờ", eName: "waiting"},
    {id: 2, name: "Đã chấp nhận", eName: "accepted"},
    {id: 3, name: "Đang diễn ra", eName: "started"},
    {id: 4, name: "Đã hủy", eName: "cancelled"}
  ];
  public minStart: Date = new Date(0);
  public maxStart: Date = new Date(2019, 1, 2);
  public minEnd: Date = new Date(0);
  public maxEnd: Date = new Date(2019, 1, 2);

  // Cac thanh phan cua edit template
  @ViewChild('StartTime') startTimeElement: DateTimePicker; // thoi gian bat dau trong user-calendar
  @ViewChild('EndTime') endTimeElement: DateTimePicker;// thoi gian ket thuc trong user-calendar
  @ViewChild('EventPlace') placeElement: DropDownList; // dia diem trong user-calendar
  @ViewChild('EventTitle') titleElement: HTMLInputElement;
  @ViewChild('EventDescription') descriptionElement: HTMLInputElement;


  constructor(
    private placeSrv: DiadiembayService
    ) { }

  ngOnInit() {
    //undefined
    // console.log('lich bay 1:', this.lichTapBayData);
  }

  ngOnChanges() {
    // sended
    // console.log('lich bay 2:', this.lichTapBayData);
    this.renderLichTapBayTemplate(this.lichTapBayData);
  }

  public renderLichTapBayTemplate(lichTapBayData) {
    if (lichTapBayData) {
      this.eventDescription = lichTapBayData['description'];
      this.eventStartTime = lichTapBayData['StartTime'];
      this.eventEndTime = lichTapBayData['EndTime'];
      this.eventStatus = lichTapBayData['status'];
      this.eventPlace = lichTapBayData['diaDiemBay']['diaChi'];
      this.placeNameList = this.placeSrv.getPlaceNameList();
      if (this.eventStatus == this.statusList[2].name || this.eventStatus == this.statusList[3].name) {
          this.titleElement['nativeElement']['readOnly'] = true;
          this.descriptionElement['nativeElement']['readOnly'] = true;
          this.startTimeElement.readonly = true;
          this.endTimeElement.readonly = true;
          this.placeElement.readonly = true;
          this.minStart = new Date();
          this.maxStart = lichTapBayData['EndTime'];
          this.minEnd = lichTapBayData['StartTime'];
          let day: number = 30;
          this.maxEnd = new Date( this.maxEnd.setTime(this.maxStart.getTime() + day*24*60*60*1000) );//ngày nào cũng được
    
      } else {
          this.titleElement['nativeElement']['readOnly'] = false;
          this.descriptionElement['nativeElement']['readOnly'] = false;
          this.startTimeElement.readonly = false;
          this.endTimeElement.readonly = false;
          this.placeElement.readonly = false;
          this.minStart = new Date();
          this.maxStart = lichTapBayData['EndTime'];
          this.minEnd = lichTapBayData['StartTime'];
          let day: number = 30;
          this.maxEnd = new Date( this.maxEnd.setTime(this.maxStart.getTime() + day*24*60*60*1000) );//ngày nào cũng được
      }
  }
  }
  public OnChangeStartDate() {
    console.log('this.eventStartTime:', this.eventStartTime)
    this.minEnd = this.eventStartTime;
  }
  public OnChangeEndDate() {
    console.log('this.eventEndTime:', this.eventEndTime)
    this.maxStart = this.eventEndTime;
  }
}
