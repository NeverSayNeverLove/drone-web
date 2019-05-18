import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ViewChild } from '@angular/core';
import { LichtapbayService } from '../services/event/lichtapbay.service'
import { DiadiembayService } from '../services/training/diadiembay.service';
import { DateTimePicker } from '@syncfusion/ej2-calendars';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

import { UserService } from '../services/auth/user.service';
import { DataService } from '../services/helper/data.service';

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
  public eventPlace: number;
  public eventTitle: string;
  
  public placeList;
  public fieldsPlace: any;
  
  @Output() changedLichbay = new EventEmitter<object>();

  // Cac thanh phan cua edit template
  @ViewChild('StartTime') startTimeElement: DateTimePicker; // thoi gian bat dau trong user-calendar
  @ViewChild('EndTime') endTimeElement: DateTimePicker;// thoi gian ket thuc trong user-calendar
  @ViewChild('EventPlace') placeElement: DropDownList; // dia diem trong user-calendar
  @ViewChild('EventTitle') titleElement: HTMLInputElement;
  @ViewChild('EventDescription') descriptionElement: HTMLInputElement;


  constructor(
    private placeSrv: DiadiembayService,
    private userSrv: UserService,
    private dataSrv: DataService,
    ) { }

  ngOnInit() {
    //undefined
    // console.log('lich bay 1:', this.lichTapBayData);

  }

  ngOnChanges() {
    // sended
    this.renderLichTapBayTemplate();
    // this.fieldsPlace = { text: 'diaChi', value: 'id' };
  }

  public sendChangedLichBay() {
    this.changedLichbay.emit(this.lichTapBayData);
  }

  public renderLichTapBayTemplate() {
    if (this.lichTapBayData) {
      //showUpView
      this.eventTitle = this.lichTapBayData['Subject'];
      this.eventDescription = this.lichTapBayData['description'];
      this.eventStartTime = this.lichTapBayData['StartTime'];
      this.eventEndTime = this.lichTapBayData['EndTime'];
      this.eventStatus = this.lichTapBayData['status'];
      // console.log('eventPlace', this.lichTapBayData['diaDiemBay']);
      this.eventPlace = this.lichTapBayData['diaDiemBay']['id'];
      this.fieldsPlace = { text: 'diaChi', value: 'id' };
      this.placeList = this.placeSrv.getPlaceList();
      // console.log('placeNameList', this.placeNameList);
      
      //setTemplate
      // NCC || Đang diễn ra, Kết thúc, Hủy của User
      if (this.userSrv.isSup || this.eventStatus == this.dataSrv.statusList[2].name || this.eventStatus == this.dataSrv.statusList[3].name
          || this.eventStatus == this.dataSrv.statusList[4].name) {
          this.titleElement['nativeElement']['readOnly'] = true;
          this.descriptionElement['nativeElement']['readOnly'] = true;
          this.startTimeElement.readonly = true;
          this.endTimeElement.readonly = true;
          this.placeElement.readonly = true;
      }
     
      //  Đang chờ của User
      if (this.userSrv.isUser && this.eventStatus == this.dataSrv.statusList[0].name) {
          this.titleElement['nativeElement']['readOnly'] = false;
          this.descriptionElement['nativeElement']['readOnly'] = false;
          this.startTimeElement.readonly = false;
          this.endTimeElement.readonly = false;
          this.placeElement.readonly = false;
      }
      
      //Đã chấp nhận của User
      if (this.userSrv.isUser && this.eventStatus == this.dataSrv.statusList[1].name) {
          this.titleElement['nativeElement']['readOnly'] = true;
          this.descriptionElement['nativeElement']['readOnly'] = false;
          this.startTimeElement.readonly = true;
          this.endTimeElement.readonly = true;
          this.placeElement.readonly = true;
      }
    }
  }
  // public OnChangeStartDate() {
  //   console.log('this.eventStartTime:', this.eventStartTime)
  //   this.minEnd = this.eventStartTime;
  // }
  // public OnChangeEndDate() {
  //   console.log('this.eventEndTime:', this.eventEndTime)
  //   this.maxStart = this.eventEndTime;
  // }
  public onChangePlace(event) {
    this.lichTapBayData['diaDiemBay'] = this.placeSrv.findDiaDiemBay(event);
    this.sendChangedLichBay();
  }
  public onChangeStart(event) {
    this.lichTapBayData['StartTime'] = new Date(event);
    this.sendChangedLichBay();
  }
  public onChangeEnd(event) {
    this.lichTapBayData['EndTime'] = new Date(event);
    this.sendChangedLichBay();
  }
}
