import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { DateTimePicker } from '@syncfusion/ej2-calendars';
import { RadioButtonComponent } from '@syncfusion/ej2-angular-buttons';

@Component({
  selector: 'edit-issue',
  templateUrl: './edit-issue.component.html',
  styleUrls: ['./edit-issue.component.sass']
})
export class EditIssueComponent {

  // @Input() issueData: Object;
  @Input() args: object;
  public issueData: object;
  public eventDescription: string;
  public eventStartTime: Date;
  public eventEndTime: Date;
  public eventStatus: string;
  public eventPlace: string;
  public eventTitle: string;

  public statusIssueID: number = 0;
  public minStart: Date = new Date(2019, 1, 1);
  public maxStart: Date = new Date(2019, 1, 2);
  public minEnd: Date = new Date(2019, 1, 1);
  public maxEnd: Date = new Date(2019, 1, 2);

  constructor() { }

  // Cac thanh phan cua edit template
  @ViewChild('StartTime') startTimeElement: DateTimePicker; // thoi gian bat dau trong user-calendar
  @ViewChild('EndTime') endTimeElement: DateTimePicker;// thoi gian ket thuc trong user-calendar
  @ViewChild('EventTitle') titleElement: HTMLInputElement;
  @ViewChild('EventDescription') descriptionElement: HTMLInputElement;

  @ViewChild('plannedRadio') plannedRadioElement: RadioButtonComponent; // 
  @ViewChild('startedRadio') startedRadioElement: RadioButtonComponent; // 
  @ViewChild('endedRadio') endedRadioElement: RadioButtonComponent; // 


  ngOnChanges() {
    // sended
    console.log('args: change', this.args);
    this.issueData = this.args['data'];
    this.renderIssueTemplate(this.issueData);
  }

  public renderIssueTemplate(issueData) {
    // console.log("issuedata", issueData); 
    // Started Issue
    if (issueData['statusIssue']['id'] == 2) {
      this.renderStartedIssueTemplate(issueData);
    }
    // Ended Issue
    if (issueData['statusIssue']['id'] == 3) {
      this.renderEndedIssueTemplate(issueData);
    }
    // Planned Issue
    if (issueData['statusIssue']['id'] == 1) {
      this.renderPlannedIssueTemplate(issueData);
    }
    // hiển thị lên view
    this.eventDescription = issueData['description'];       // hiển thị mô tả
    this.eventStartTime = issueData['StartTime'];           // hiển thị start
    this.eventEndTime = issueData['EndTime'];               // hiển thị end
    this.eventTitle = issueData['Subject'];                 // hiển thị title
  }

  private renderPlannedIssueTemplate(issueData) {
    //radio checked
    this.plannedRadioElement.checked = true;
    this.startedRadioElement.checked = false;
    this.endedRadioElement.checked = false;

    // planned nằm ở tương lai
    if (issueData['StartTime'].getTime() > new Date().getTime()) {
      this.startTimeElement.readonly = false;
      this.endTimeElement.readonly = false;
      this.minStart = new Date();
      this.maxStart = issueData['EndTime'];
      this.minEnd = issueData['StartTime'];
      this.maxEnd = new Date(2025, 1, 1);
    }

    // planned nằm trọn ở quá khứ
    if (issueData['EndTime'].getTime() < new Date().getTime()) {
      this.renderEndedIssueTemplate(issueData);
      //yêu cầu ng dùng click save, chuyển sang trạng thái Ended...
    }

    // planned nằm giữa quá khứ và hiện tại
    if (issueData['StartTime'].getTime() <= new Date().getTime()
      && new Date().getTime() <= issueData['EndTime'].getTime()) {
      //radio checked
      this.plannedRadioElement.checked = false;
      this.startedRadioElement.checked = true;
      this.endedRadioElement.checked = false;
      //time 
      // end > now nên render started bị lỗi
      this.startTimeElement.readonly = false;
      this.endTimeElement.readonly = false;
      this.minStart = new Date(0);
      this.maxStart = new Date();  
      this.minEnd = this.issueData['StartTime'];
      this.maxEnd = this.issueData['EndTime'];
      // this.renderStartedIssueTemplate(issueData);                      
      //yêu cầu ng dùng click save, chuyển sang trạng thái Started...
    }
  }
  private renderStartedIssueTemplate(args) {
    //radio checked
    this.plannedRadioElement.checked = false;
    this.startedRadioElement.checked = true;
    this.endedRadioElement.checked = false;
    //time 
    this.startTimeElement.readonly = false;
    this.endTimeElement.readonly = false;
    this.minStart = new Date(0);
    this.maxStart = this.issueData['EndTime'];  // start <= now = end; sau 1 thời gian thì end < now
    this.minEnd = this.issueData['StartTime'];
    this.maxEnd = new Date();                  // không thể kết thúc ở tương lai
  }

  private renderEndedIssueTemplate(args) {
    //radio checked
    this.plannedRadioElement.checked = false;
    this.startedRadioElement.checked = false;
    this.endedRadioElement.checked = true;
    //time
    this.startTimeElement.readonly = true;
    this.endTimeElement.readonly = true;
    this.minStart = new Date(0);
    this.maxStart = new Date();
    this.minEnd = new Date(0);
    this.maxEnd = new Date();
  }

  public onChangeStartDate() {
    this.minEnd = this.eventStartTime;
  }
  public onChangeEndDate() {
    this.maxStart = this.eventEndTime;
  }

  public onChangeStatus(event) {
    // thay đổi lại thời gian về mặc định của trạng thái được select
    console.log(event);
    this.statusIssueID = event.value;
    console.log("statusID selected", this.statusIssueID)
  }
}
