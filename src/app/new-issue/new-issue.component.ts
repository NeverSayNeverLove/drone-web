import { Component, OnInit, ViewChild } from '@angular/core';

import { DateTimePicker } from '@syncfusion/ej2-calendars';

import { UserService } from '../services/auth/user.service';
import { DataService } from '../services/helper/data.service';
import { IssueCategory } from '../services/event/issue.service.service';

@Component({
  selector: 'new-issue',
  templateUrl: './new-issue.component.html',
  styleUrls: ['./new-issue.component.sass']
})
export class NewIssueComponent implements OnInit {

  // Cac thanh phan cua edit template
  @ViewChild('StartTime') startTimeElement: DateTimePicker; // thoi gian bat dau trong user-calendar
  @ViewChild('EndTime') endTimeElement: DateTimePicker;// thoi gian ket thuc trong user-calendar

  public eventDescription: string;
  public eventStartTime: Date;
  public eventEndTime: Date;
  public eventStatus: number;
  public eventPlace: string;
  public eventTitle: string;
  public issueCate: number;

  public statusIssueList;
  public fieldsIssueStatus: any;

  public issueCateList: IssueCategory;
  public fieldsIssueCate: any;

  public minStart: Date = new Date(0);
  public maxStart: Date = new Date(1);
  public minEnd: Date = new Date(0);
  public maxEnd: Date = new Date(1);

  constructor(
    private userSrv: UserService,
    private dataSrv: DataService,) { }

  ngOnInit() {
    this.renderIssueTemplate();
  }

  public renderIssueTemplate() {
    this.eventStartTime = new Date();
    this.eventEndTime = new Date();
    this.setMinMaxTime(new Date(), this.eventEndTime, this.eventStartTime, new Date(2025, 12, 31));
    this.statusIssueList = this.dataSrv.statusIssueList;
    this.fieldsIssueStatus = { text: 'name', value: 'id' };
    this.eventStatus = 1;
    this.issueCateList = this.dataSrv.getItem('issueCate');
    this.fieldsIssueCate = { text: 'tenLoi', value: 'id' };
    this.issueCate = 1;
  }
  
  public onSelectedStatusIssue(event) {
    switch (event) {
      case 1:
        this.setMinMaxTime(new Date(), this.eventEndTime, this.eventStartTime, new Date(2025, 12, 31));
        break;
      case 2:
        this.setMinMaxTime(new Date(0), new Date(), new Date(), new Date(2025, 12, 31));
        break;
      case 3:
        this.setMinMaxTime(new Date(0), new Date(), this.eventStartTime, new Date());
        break;
    
      default:
        break;
    }
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

}
