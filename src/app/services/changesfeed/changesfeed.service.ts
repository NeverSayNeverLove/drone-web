import { Injectable } from '@angular/core';
import { DataService } from '../../services/helper/data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../helper/config';
import { UserService } from '../../services/auth/user.service';
import { HelperService } from '../helper/helper.service'

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
export class ChangesfeedService {

  constructor(
    private dataSrv: DataService,
    private http: HttpClient,
    private userSrv: UserService,
    private helperSrv: HelperService,) { }

  public async fetchChangesFeedBySup(priorTime) {
    priorTime = this.helperSrv.formatDateTime(priorTime);
    let listPages: any;
    listPages = [];
    let totalChange;
    let tmp;
    let tmpFirst;
    tmpFirst = await new Promise((resolve, reject) => {
      this.http.get(`${Config.api_endpoint}log-event/nha-cung-cap-id=${this.userSrv.getCurrentUserID('CurrentUser')}?page=1&limit=${Config.pageSizeMax}&tenEvent=LỊCH TẬP BAY&thoiGianThaoTac=${priorTime}`, httpOptions).subscribe(data => {
        resolve(data);
      });
    });
    listPages.push(tmpFirst);
    totalChange = tmpFirst['total'];
    let pageSize = tmpFirst.pageSize;
    let pages = Math.ceil(totalChange / pageSize);
    for (let page = 2; page <= pages; page++) {
      tmp = await new Promise((resolve, reject) => {
        this.http.get(`${Config.api_endpoint}log-event/nha-cung-cap-id=${this.userSrv.getCurrentUserID('CurrentUser')}?page=${page}&limit=${Config.pageSizeMax}&tenEvent=LỊCH TẬP BAY&thoiGianThaoTac=${priorTime}`, httpOptions).subscribe(data => {
          resolve(data);
        });
      });
      listPages.push(tmp);
    }
    return listPages;
  }
  public async fetchChangesFeedByUser(priorTime) {
    priorTime = this.helperSrv.formatDateTime(priorTime);
    let listPages: any;
    listPages = [];
    let totalChange;
    let tmp;
    let tmpFirst;
    tmpFirst = await new Promise((resolve, reject) => {
      this.http.get(`${Config.api_endpoint}log-event/lichbay-khach?nguoiDangKyId=${this.userSrv.getCurrentUserID('CurrentUser')}&page=1&limit=${Config.pageSizeMax}&thoiGianThaoTac=${priorTime}`, httpOptions).subscribe(data => {
        resolve(data);
      });
    });
    listPages.push(tmpFirst);
    totalChange = tmpFirst['total'];
    let pageSize = tmpFirst.pageSize;
    let pages = Math.ceil(totalChange / pageSize);
    for (let page = 2; page <= pages; page++) {
      tmp = await new Promise((resolve, reject) => {
        this.http.get(`${Config.api_endpoint}log-event/lichbay-khach?nguoiDangKyId=${this.userSrv.getCurrentUserID('CurrentUser')}&page=${page}&limit=${Config.pageSizeMax}&thoiGianThaoTac=${priorTime}`, httpOptions).subscribe(data => {
          resolve(data);
        });
      });
      listPages.push(tmp);
    }
    return listPages;
  }
}
