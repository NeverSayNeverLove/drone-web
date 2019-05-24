import { Injectable } from '@angular/core';
import { Config } from '../helper/config';
import { DataService } from '../helper/data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserService, User } from '../auth/user.service';
import { HelperService } from '../helper/helper.service'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};
@Injectable({
  providedIn: 'root'
})
export class IssueService {

  constructor(
    private http: HttpClient,
    private dataSrv: DataService,
    private helperSrv: HelperService,
    private userSrv: UserService,
  ) { }
   //FETCH TẤT CẢ LỖI PHÁT SINH CỦA NHÀ CUNG CẤP 
   async fetchIssue(sup_Id: number) {
    let issuePromise: any;
    issuePromise = [];
    try {
      let tmp;
      tmp = await new Promise((resolve, reject) => {
        this.http.get(`${Config.api_endpoint}loi-phat-sinh/nha-cung-cap-id=${sup_Id}?page=1&limit=${Config.pageSizeMax}`, httpOptions).subscribe(data => {
          resolve(data);
        });
      });

      issuePromise.push(tmp);
      let pages = tmp['totalPages'];
      // let pageSize = tmp['size'];
      for (let page = 2; page <= Config.pages; page++) {
        tmp = await new Promise((resolve, reject) => {
          this.http.get(`${Config.api_endpoint}loi-phat-sinh/nha-cung-cap-id=${sup_Id}?page=${page}&limit=${Config.pageSizeMax}`, httpOptions).subscribe(data => {
            resolve(data);
          });
        });
        issuePromise.push(tmp);
      }
    } catch (error) {
      throw error;
    }
    return issuePromise;
  }

  //FETCH  TẤT CẢ LOẠI LỖI
  async fetchIssueCategory() {
    let issuePromise: any;
    issuePromise = [];
    try {
      let tmp;
      tmp = await new Promise((resolve, reject) => {
        this.http.get(`${Config.api_endpoint}loai-loi/?page=1&limit=100`, httpOptions).subscribe(data => {
          resolve(data);
        });
      });
      issuePromise.push(tmp);
      let pages = tmp['totalPages'];
      // let pageSize = tmp['size'];
      for (let page = 2; page <= Config.pages; page++) {
        tmp = await new Promise((resolve, reject) => {
          this.http.get(`${Config.api_endpoint}loai-loi/?page=${page}&limit=${Config.pageSizeMax}`, httpOptions).subscribe(data => {
            resolve(data);
          });
        });
        issuePromise.push(tmp);
      }
    } catch (error) {
      throw error;
    }
    return issuePromise;
  }

  public createNewIssueToLocal(e): Issue {
    let currentUser = this.userSrv.getCurrentUser('CurrentUser');
    console.log('id-issueCate', this.dataSrv.getItem('issueCate'))
    let issueCategory = this.dataSrv.getItem('issueCate').find(ic => ic.id == e.issuesCategoryID);
    return new Issue(e.Id, e.Subject, new Date(e.StartTime), new Date(e.EndTime),
      e.description, currentUser, e.statusID, issueCategory)
  }

  public createNewIssueToServer(event) {
    let startTime = this.helperSrv.formatDateTime(event.StartTime);
    let endTime = this.helperSrv.formatDateTime(event.EndTime);
    let planned_start = this.helperSrv.formatDateTime(event.StartTime);
    let planned_end = this.helperSrv.formatDateTime(event.EndTime);

    switch (event.statusID) {
        case 1: // planned
            startTime = null;
            endTime = null;
            planned_start = this.helperSrv.formatDateTime(event.StartTime);
            planned_end = this.helperSrv.formatDateTime(event.EndTime);
            break;
        case 2: // started
            startTime = this.helperSrv.formatDateTime(event.StartTime);
            endTime = null;
            planned_start = this.helperSrv.formatDateTime(event.StartTime);
            planned_end = this.helperSrv.formatDateTime(event.EndTime);
            break;
        case 3: // ended
            startTime = this.helperSrv.formatDateTime(event.StartTime);
            endTime = this.helperSrv.formatDateTime(event.EndTime);
            planned_start = this.helperSrv.formatDateTime(event.StartTime);
            planned_end = this.helperSrv.formatDateTime(event.EndTime);
            break;
        default:
            break;
    }

    return {
        "nhaCungCapId": this.userSrv.getCurrentUserID('CurrentUser'),
        "thoiGianBatDau": startTime,
        "thoiGianKetThuc": endTime,
        "duTinhBatDau": planned_start,
        "duTinhKetThuc": planned_end,
        "moTa": event.Subject,
        "listLoaiLoiId": [event.issuesCategoryID]
    }
  }

  public saveIssueToServer(issue) {
    this.updateIssue(issue).subscribe(
      (issue) => {console.log('issue:', issue);},
      (error: any) => {console.log(error)}
  );
  }

  private updateIssue(issue) {
    return this.http.post(`${Config.api_endpoint}loi-phat-sinh/save`, issue, httpOptions);
  }

  public createIssue(lichtapbay) {
    return this.http.post(`${Config.api_endpoint}lich-tap-bay/save`, lichtapbay, httpOptions);
  }

  public deleteIssueToServer(id) {
    return this.http.delete(`${Config.api_endpoint}loi-phat-sinh/delete/${id}`);
  }

  public createChangedIssueObject(event) {
    console.log('event isse', event)
    let startTime = this.helperSrv.formatDateTime(event.StartTime);
    let endTime = this.helperSrv.formatDateTime(event.EndTime);
    let planned_start = this.helperSrv.formatDateTime(event.StartTime);
    let planned_end = this.helperSrv.formatDateTime(event.EndTime);

    switch (event.statusID) {
        case 1: // planned
            startTime = null;
            endTime = null;
            planned_start = this.helperSrv.formatDateTime(event.StartTime);
            planned_end = this.helperSrv.formatDateTime(event.EndTime);
            break;
        case 2: // started
            startTime = this.helperSrv.formatDateTime(event.StartTime);
            endTime = null;
            planned_start = this.helperSrv.formatDateTime(event.StartTime);
            planned_end = this.helperSrv.formatDateTime(event.EndTime);
            break;
        case 3: // ended
            startTime = this.helperSrv.formatDateTime(event.StartTime);
            endTime = this.helperSrv.formatDateTime(event.EndTime);
            planned_start = this.helperSrv.formatDateTime(event.StartTime);
            planned_end = this.helperSrv.formatDateTime(event.EndTime);
            break;
        default:
            break;
    }
    
    return {
        "id": event.Id,
        "nhaCungCapId": this.userSrv.getCurrentUserID('CurrentUser'),
        "thoiGianBatDau": startTime,
        "thoiGianKetThuc": endTime,
        "duTinhBatDau": planned_start,
        "duTinhKetThuc": planned_end,
        "moTa": event.Subject,
        "listLoaiLoiId": [event.issuesCategoryID]
    }
  }

}

export class Issue {
  constructor(
    public Id: number = 0,
    public Subject: string = "",//mota
    public StartTime: Date = new Date(),
    public EndTime: Date = new Date(),
    public description: string = "",//mota
    public nhaCungCap: User,
    public statusID: number,
    public issuesCategory: IssueCategory,
    public allDay: boolean = true,
    public IsReadonly: boolean = false,
    public typeOfEvent: string = "Issue",
    public CategoryColor: string = "#ea7a57",
  ) {}
}

export class IssueCategory {
  constructor(
    public id: number = 0,
    public mauLoi: string= "",
    public tenLoi: string= "",
  ) {}
}