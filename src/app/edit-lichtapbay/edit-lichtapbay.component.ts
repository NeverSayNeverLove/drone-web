import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ViewChild } from '@angular/core';
// import { LichtapbayService } from '../services/event/lichtapbay.service'
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

  @Input() lichTapBayData: Object;
  public eventDescription: string;
  public eventStartTime: Date;
  public eventEndTime: Date;
  public eventStatus: string;
  public eventStatusID: number;
  public eventPlaceID: number;
  public eventTitle: string;

  public eventGuestName: string;
  public eventGuestTel: string;
  public eventGuestEmail: string;
  
  public placeList;
  public fieldsPlace: any;
  public statusLichTapBayList;
  public fieldsStatus: any;

  
  @Output() changedLichbay = new EventEmitter<object>();

  // Cac thanh phan cua edit template
  @ViewChild('StartTime') startTimeElement: DateTimePicker; // thoi gian bat dau trong user-calendar
  @ViewChild('EndTime') endTimeElement: DateTimePicker;// thoi gian ket thuc trong user-calendar
  @ViewChild('EventPlace') placeElement: DropDownList; // dia diem trong user-calendar
  @ViewChild('EventTitle') titleElement: HTMLInputElement;
  @ViewChild('EventDescription') descriptionElement: HTMLInputElement;
  @ViewChild('StatusLichTapBay') statusLichTapBayElement: DropDownList;


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
    this.statusLichTapBayList = this.dataSrv.statusList;
    this.fieldsPlace = { text: 'diaChi', value: 'id' }; // value lấy trường nào thì đầu vào phải là trường đấy
    this.fieldsStatus = { text: 'name', value: 'id'};
    this.renderLichTapBayTemplate();

    // this.fieldsPlace = { text: 'diaChi', value: 'id' };
  }

  public sendChangedLichBay() {
    this.changedLichbay.emit(this.lichTapBayData);
  }

  public renderLichTapBayTemplate() {
    if (this.userSrv.isSup) {
      this.showSubscriberInfo()
    }
    if (this.lichTapBayData) {
      //showUpView
      this.eventTitle = this.lichTapBayData['Subject'];
      this.eventDescription = this.lichTapBayData['description'];
      this.eventStartTime = this.lichTapBayData['StartTime'];
      this.eventEndTime = this.lichTapBayData['EndTime'];
      this.eventStatus = this.lichTapBayData['status'];
      this.eventPlaceID = this.lichTapBayData['diaDiemBay']['id'];
      // chỉ lấy địa điểm của nhà cung cấp mà lich bay hiện tại đã đăng kí
      // console.log('renderLichTapBayTemplate', this.lichTapBayData)
      this.placeList = this.getCurrSupPlaceList(this.lichTapBayData['nhaCungCap']['id']);
     
      
      //setTemplate
      // NCC || Đang diễn ra, Kết thúc, Hủy của User
      if (this.userSrv.isSup
          || this.eventStatus == this.dataSrv.statusList[2].name
          || this.eventStatus == this.dataSrv.statusList[3].name
          || this.eventStatus == this.dataSrv.statusList[4].name) {
          this.titleElement['nativeElement']['readOnly'] = true;
          this.descriptionElement['nativeElement']['readOnly'] = true;
          this.startTimeElement.readonly = true;
          this.endTimeElement.readonly = true;
          this.placeElement.readonly = true;
          this.eventStatusID = this.getIDStatusLichBay(this.lichTapBayData['status']);
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

  private showSubscriberInfo() {
    console.log('on rendar lichbay', this.lichTapBayData);
    this.eventGuestName = this.lichTapBayData['nguoiDangKy']['hoTen'];
    this.eventGuestTel = this.lichTapBayData['nguoiDangKy']['soDienThoai'];
    this.eventGuestEmail = this.lichTapBayData['nguoiDangKy']['email'];
    console.log('show info sub name', this.eventGuestName)
  }

  // lấy danh sách địa điểm theo id nhà cung cấp.
  private getCurrSupPlaceList(id: number) {
    return this.placeSrv.getPlaceList().filter(e => e['nhaCungCap']['id'] == id);
  }

  private getIDStatusLichBay(name): number {
    switch (name) {
      case this.dataSrv.statusList[0].name:
        return 1;
      case this.dataSrv.statusList[1].name:
        return 2;
      case this.dataSrv.statusList[2].name:
        return 3;
      case this.dataSrv.statusList[3].name:
        return 4;
      case this.dataSrv.statusList[4].name:
        return 5;
      default:
        break;
    }
  }
  public changeStatus(event) {
    console.log("change status", event);
  }
}
