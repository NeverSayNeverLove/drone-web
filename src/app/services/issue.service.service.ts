import { Injectable } from '@angular/core';
import { Config } from '../services/config';
import { DataService } from './data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.service';

const httpOptions = {
  headers: new HttpHeaders({
    'accept': 'application/json',
    'accept-language': 'en-US,en;q=0.9,vi;q=0.8,ja;q=0.7',
    'x-requested-with': 'XMLHttpRequest'
  })
};
@Injectable({
  providedIn: 'root'
})
export class IssueService {

  constructor(
    private http: HttpClient,
    private dataSrv: DataService
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
      for (let page = 2; page <= pages; page++) {
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
  async fetchTypeOfIssue() {
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

    } catch (error) {
      throw error;
    }
    return issuePromise;
  }

}

export class Issue {
  constructor(
    public Id: number = 0,
    public Subject: string = "",//mota
    public StartTime: Date = new Date(),
    public EndTime: Date = new Date(),
    public Planned_Start: string = '',
    public Planned_End: string = '',
    public description: string = "",//mota
    public nhaCungCap: User,
    public allDay: boolean = true,
    public IsReadonly: boolean = false,
    public typeOfEvent: string = "Issue",
    public CategoryColor: string = "#58585a",
  ) {}
}
