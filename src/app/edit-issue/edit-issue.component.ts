import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { DateTimePicker } from '@syncfusion/ej2-calendars';
import { RadioButtonComponent } from '@syncfusion/ej2-angular-buttons';

import { UserService } from '../services/auth/user.service';
import { DataService } from '../services/helper/data.service';

@Component({
  selector: 'edit-issue',
  templateUrl: './edit-issue.component.html',
  styleUrls: ['./edit-issue.component.sass']
})
export class EditIssueComponent {

  // @Input() this.issueData: Object;
  @Input() args: object;
  public issueData: object;
  public eventDescription: string;
  public eventStartTime: Date;
  public eventEndTime: Date;
  public eventStatus: number;
  public eventPlace: string;
  public eventTitle: string;

  public statusIssueList;
  public fieldsIssueStatus: any;

  public statusIssueID: number = 0;
  public minStart: Date = new Date(0);
  public maxStart: Date = new Date(1);
  public minEnd: Date = new Date(0);
  public maxEnd: Date = new Date(1);

  public disabledPlanned: boolean = false;
  public disabledStarted: boolean = false;
  public disabledEnded: boolean = false;

  constructor(
    private userSrv: UserService,
    private dataSrv: DataService,) { }

  // Cac thanh phan cua edit template
  @ViewChild('StartTime') startTimeElement: DateTimePicker; // thoi gian bat dau trong user-calendar
  @ViewChild('EndTime') endTimeElement: DateTimePicker;// thoi gian ket thuc trong user-calendar
  @ViewChild('EventTitle') titleElement: HTMLInputElement;
  @ViewChild('EventDescription') descriptionElement: HTMLInputElement;

  // @ViewChild('plannedRadio') plannedRadioElement: RadioButtonComponent; // 
  // @ViewChild('startedRadio') startedRadioElement: RadioButtonComponent; // 
  // @ViewChild('endedRadio') endedRadioElement: RadioButtonComponent; // 

  ngOnChanges() {
    // sended
    // console.log('args: change', this.args);
    this.issueData = this.args['data'];
    console.log("issue dataaaaaaaaa", this.issueData);
    this.renderIssueTemplate();
  }

  public renderIssueTemplate() {
    // Planned Issue
    if (this.issueData['statusID'] == 1) {
      this.showUpTime(this.issueData['StartTime'], this.issueData['EndTime']);
      this.initPlannedIssueTemplate();
    }
    // Started Issue
    if (this.issueData['statusID'] == 2) {
      this.setStartedIssueTemplate();
      this.showUpTime(this.issueData['StartTime'], new Date());
    }
    // Ended Issue
    if (this.issueData['statusID'] == 3) {
      this.initEndedIssueTemplate();
      this.showUpTime(this.issueData['StartTime'], this.issueData['EndTime']);
    }
    // hiển thị lên view
    console.log('statusIssueID', this.issueData)
    this.eventStatus = this.issueData['statusID'];
    this.statusIssueList = this.dataSrv.statusIssueList.filter(e => e.id >= this.eventStatus);
    // this.statusIssueList = 
    this.fieldsIssueStatus = { text: 'name', value: 'id' };
    this.eventDescription = this.issueData['description'];       // hiển thị mô tả
    this.eventTitle = this.issueData['Subject'];                 // hiển thị title
  }

  public onSelectedStatusIssue(event) {
    console.log(event);
    switch (event) {
      case 1:
        //nếu đang là planned tương lai
        if (this.issueData['statusID'] == 1 && this.issueData['StartTime'].getTime() > new Date().getTime()) {
          //trở về trạng thái ban đầu
          this.showUpTime(this.issueData['StartTime'], this.issueData['EndTime']);
          this.setTimeReadonly(false, false);
          this.setMinMaxTime(new Date(), this.issueData['EndTime'], this.issueData['StartTime'], new Date(2025, 1, 1));
        }
        break;
      case 2:
        //nếu đang là started hoặc tương lai 2 thì quay về thời gian ban đầu
        if (this.issueData['statusID'] == 2) {
          this.showUpTime(this.issueData['StartTime'], new Date());
          this.setStartedIssueTemplate();
        }
    
        if ((this.issueData['statusID'] == 1) &&
          (this.issueData['StartTime'].getTime() <= new Date().getTime() && new Date().getTime() <= this.issueData['EndTime'].getTime())) {
          this.showUpTime(this.issueData['StartTime'], new Date());
          this.setStartedIssueTemplate();
        }
    
        //nếu đang là planned tương lai
        if (this.issueData['statusID'] == 1 && this.issueData['StartTime'].getTime() > new Date().getTime()) {
          //khởi tạo 1 new started mặc định
          this.showUpTime(new Date(), new Date());
          this.setTimeReadonly(false, true);
          this.setMinMaxTime(new Date(0), this.eventEndTime, this.eventStartTime, this.eventEndTime);
        }
        break;
      case 3:
        //nếu đang là started hoặc tương lai 2 
        if (this.issueData['statusID'] == 2) {
          this.setTimeReadonly(false, false);
        }
        if ((this.issueData['statusID'] == 1) &&
          (this.issueData['StartTime'].getTime() <= new Date().getTime()
            && new Date().getTime() <= this.issueData['EndTime'].getTime())) {
    
          this.setTimeReadonly(false, false);
        }
    
        //nếu đang là planned tương lai
        if (this.issueData['statusID'] == 1 && this.issueData['StartTime'].getTime() > new Date().getTime()) {
          //thì khởi tạo 1 new ended mặc định
          this.showUpTime(new Date(), new Date());
          this.setTimeReadonly(false, false);
          this.setMinMaxTime(new Date(0), this.eventEndTime, this.eventStartTime, this.eventEndTime);
        }
        break;
    
      default:
        break;
    }
  }

  private initPlannedIssueTemplate() {
    // planned nằm ở tương lai
    if (this.issueData['StartTime'].getTime() > new Date().getTime()) {
      this.setTimeReadonly(false, false);
      this.setMinMaxTime(new Date(), this.issueData['EndTime'], this.issueData['StartTime'], new Date(2025, 1, 1));
    }

    // planned nằm giữa quá khứ và hiện tại
    if (this.issueData['StartTime'].getTime() <= new Date().getTime()
      && new Date().getTime() <= this.issueData['EndTime'].getTime()) {
      this.showUpTime(this.issueData['StartTime'], new Date()); //khởi tạo 1 new started với starttime của planned, thông báo đến ng dùng
      this.setStartedIssueTemplate();
    }

    // planned nằm trọn ở quá khứ
    if (this.issueData['EndTime'].getTime() < new Date().getTime()) {
      this.initEndedIssueTemplate();  //thì khởi tạo 1 new ended với thời gian của planned

      //<--yêu cầu ng dùng click save, chuyển sang trạng thái Ended-->
    }
  }

  private setStartedIssueTemplate() {
    this.setTimeReadonly(false, true); // end mặc định là now -> readonly
    this.setMinMaxTime(new Date(0), this.issueData['EndTime'], this.issueData['StartTime'], new Date());
  }

  private initEndedIssueTemplate() {
    this.setTimeReadonly(true, true);
    this.setMinMaxTime(new Date(0), new Date(), new Date(0), new Date());
  }

  // public onClickPlannedRadio(event) {
  //   console.log("click planned radio", event);
  //   this.statusIssueID = event;
  //   console.log("statusID selected", this.statusIssueID);

  //   //nếu đang là planned tương lai
  //   if (this.issueData['statusID'] == 1 && this.issueData['StartTime'].getTime() > new Date().getTime()) {
  //     //trở về trạng thái ban đầu
  //     this.showUpTime(this.issueData['StartTime'], this.issueData['EndTime']);
  //     this.setTimeReadonly(false, false);
  //     this.setMinMaxTime(new Date(), this.issueData['EndTime'], this.issueData['StartTime'], new Date(2025, 1, 1));
  //   }

  //   this.issueData['statusID'] = 1;
  // }

  // public onClickStartedRadio(event) {
  //   console.log("click started radio", event);
  //   this.statusIssueID = event;
  //   console.log("statusID selected", this.statusIssueID);
  //   console.log("status now", this.issueData['statusID']);

  //   //nếu đang là started hoặc tương lai 2 thì quay về thời gian ban đầu
  //   if (this.issueData['statusID'] == 2) {
  //     this.showUpTime(this.issueData['StartTime'], new Date());
  //     this.setTimeStartedIssue();
  //   }

  //   if ((this.issueData['statusID'] == 1) &&
  //     (this.issueData['StartTime'].getTime() <= new Date().getTime() && new Date().getTime() <= this.issueData['EndTime'].getTime())) {
  //     this.showUpTime(this.issueData['StartTime'], new Date());
  //     this.setTimeStartedIssue();
  //   }

  //   //nếu đang là planned tương lai
  //   if (this.issueData['statusID'] == 1 && this.issueData['StartTime'].getTime() > new Date().getTime()) {
  //     //khởi tạo 1 new started mặc định
  //     this.showUpTime(new Date(), new Date());
  //     this.setTimeReadonly(false, true);
  //     this.setMinMaxTime(new Date(0), this.eventEndTime, this.eventStartTime, this.eventEndTime);
  //   }
  //   this.issueData['statusID'] = 2;
  // }

  // public onClickEndedRadio(event) {
  //   console.log("click ended radio", event);
  //   this.statusIssueID = event;
  //   console.log("statusID selected", this.statusIssueID);
  //   console.log(this.issueData['statusID']);

  //   //nếu đang là started hoặc tương lai 2 
  //   if (this.issueData['statusID'] == 2) {
  //     this.setTimeReadonly(false, false);
  //   }
  //   if ((this.issueData['statusID'] == 1) &&
  //     (this.issueData['StartTime'].getTime() <= new Date().getTime()
  //       && new Date().getTime() <= this.issueData['EndTime'].getTime())) {

  //     this.setTimeReadonly(false, false);
  //   }

  //   //nếu đang là planned tương lai
  //   if (this.issueData['statusID'] == 1 && this.issueData['StartTime'].getTime() > new Date().getTime()) {
  //     //thì khởi tạo 1 new ended mặc định
  //     this.showUpTime(new Date(), new Date());
  //     this.setTimeReadonly(false, false);
  //     this.setMinMaxTime(new Date(0), this.eventEndTime, this.eventStartTime, this.eventEndTime);
  //   }
  //   this.issueData['statusID'] = 3;
  // }

  // private setRadioChecked(planned: boolean, started: boolean, ended: boolean) {
  //   console.log('planned nằm ở setRadioChecked')
  //   // this.plannedRadioElement.checked = planned;
  //   // this.startedRadioElement.checked = started;
  //   // this.endedRadioElement.checked = ended;
  // }

  private setTimeReadonly(start: boolean, end: boolean) {
    this.startTimeElement.readonly = start;
    this.endTimeElement.readonly = end;
  }

  private setMinMaxTime(minStart: Date, maxStart: Date, minEnd: Date, maxEnd: Date) {
    this.minStart = minStart;
    this.maxStart = maxStart;
    this.minEnd = minEnd;
    this.maxEnd = maxEnd;
  }

  public onChangeStartDate() {
    this.minEnd = this.eventStartTime;
  }

  public onChangeEndDate() {
    this.maxStart = this.eventEndTime;
  }

  private showUpTime(start: Date, end: Date) {
    this.eventStartTime = start;           // hiển thị start
    this.eventEndTime = end;               // hiển thị end
  }
}
