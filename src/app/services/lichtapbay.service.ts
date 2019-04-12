import { Injectable } from '@angular/core';
import { Config } from '../services/config';
import { DataService } from './data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

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
export class LichtapbayService {

  constructor(
    private http: HttpClient,
    private dataService: DataService,
    public datepipe: DatePipe
  ) { }
  //FETCH LỊCH TẬP BAY THEO ID
  async fetchFlyPlanById(id) {
    let flyPlanPromise: any;
    try {
      flyPlanPromise = await new Promise((resolve, reject) => {
        this.http.get(`${Config.api_endpoint}lich-tap-bay/${id}`, httpOptions)
          .subscribe(data => {
            console.log(data);
            resolve(data);
          });
      });
    } catch (error) {
      throw error;
    }
    return flyPlanPromise;
  }

  //FETCH LIST LỊCH TẬP BAY THEO NHÀ CUNG CẤP ID
  async fetchFlyPlanByNhacungcapId(nhacungcapId) {
    let listPromise: any;
    listPromise = [];
    try {
      let tmp;
      tmp = await new Promise((resolve, reject) => {
        this.http.get(`${Config.api_endpoint}lich-tap-bay/nha-cung-cap-id=${nhacungcapId}?page=1&limit=${Config.pageSizeMax}`, httpOptions).subscribe(data => {
          console.log('Plan by ncc id', data);
          resolve(data);
        });
      });
      listPromise.push(tmp);
      let pages = tmp['totalPages'];
      let pageSize = tmp['size'];
      for (let page = 2; page <= pages; page++) {
        tmp = await new Promise((resolve, reject) => {
          this.http.get(`${Config.api_endpoint}lich-tap-bay/nha-cung-cap-id=${nhacungcapId}?page=${page}&limit=${pageSize}`, httpOptions).subscribe(data => {
            console.log('Plan by ncc id', data);
            resolve(data);
          });
        });
        listPromise.push(tmp);
      }
    } catch (error) {
      throw error;
    }
    return listPromise;
  }

  //FOMAT DATE
  fomatDate(date: Date) {
    let fomated_Date = "";
    // fomated_Date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    fomated_Date =this.datepipe.transform(date, 'dd-MM-yyyy');
    return fomated_Date;
  }

  //FETCH LIST LỊCH TẬP BAY => (NHÀ CUNG CẤP ID + Bắt đầu từ + Bắt đầu đến + NGƯỜI ĐĂNG KÍ ID)
  async fetchFlyPlanBy_NccId_StartToFrom_UserId(
    nhacungcapId: number,
    batDauTuparam,
    batDauDenparam,
    nguoiDangKyId: number) {

    let listPromise: any;
    listPromise = [];
    try {
      let batDauDen = "";
      let batDauTu = "";

      batDauTu = this.fomatDate(batDauTuparam);
      console.log(batDauTu);
      batDauDen = this.fomatDate(batDauDenparam);
      console.log(batDauDen);

      let tmp;
      tmp = await new Promise((resolve, reject) => {
        this.http.get(`${Config.api_endpoint}lich-tap-bay/nha-cung-cap-id=${nhacungcapId}?page=1&limit=${Config.pageSizeMax}&droneId=&diaDiemId=&trangThai=&batDauTruoc=${batDauDen}&batDauSau=${batDauTu}&ketThucTruoc=&ketThucSau=&nguoiDangKyId=${nguoiDangKyId}`, httpOptions)
          //không được xuống dòng ở &afterDate
          .subscribe(data => {
            console.log('plan condition', data);
            resolve(data);
          });
      });
      listPromise.push(tmp);

      let pages = tmp['totalPages'];
      let pageSize = tmp['size'];

      //Fetch từ trang thứ 2
      for (let page = 2; page <= pages; page++) {
        tmp = await new Promise((resolve, reject) => {
          this.http.get(`${Config.api_endpoint}lich-tap-bay/nha-cung-cap-id=${nhacungcapId}?page=${page}&limit=${pageSize}&droneId=&diaDiemId=&trangThai=&batDauTruoc=${batDauDen}&batDauSau=${batDauTu}&ketThucTruoc=&ketThucSau=&nguoiDangKyId=${nguoiDangKyId}`, httpOptions)
            .subscribe(data => {
              console.log('plan condition', data);
              resolve(data);
            });
        });
        listPromise.push(tmp);
      }
    } catch (error) {
      throw error;
    }
    return listPromise;
  }

  //FETCH LIST LỊCH TẬP BAY => (NGƯỜI ĐĂNG KÍ ID + Bắt đầu từ + Bắt đầu đến)
  async fetchFlyPlanByUserId_StartToFrom_NccId(
    nguoiDangKyId: number,
    batDauTuparam,
    batDauDenparam,
    nhacungcapId: number) {

    let listPromise: any;
    listPromise = [];
    try {
      let batDauDen = "";
      let batDauTu = "";

      batDauTu = this.fomatDate(batDauTuparam);
      console.log(batDauTu);
      batDauDen = this.fomatDate(batDauDenparam);
      console.log(batDauDen);

      let tmp;
      tmp = await new Promise((resolve, reject) => {
        this.http.get(`${Config.api_endpoint}lich-tap-bay/nguoi-dang-ky-id=${nguoiDangKyId}?page=1&limit=${Config.pageSizeMax}&droneId=&diaDiemId=&trangThai=&batDauTruoc=${batDauDen}&batDauSau=${batDauTu}&ketThucTruoc=&ketThucSau=&nhaCungCapId=${nhacungcapId}`, httpOptions)
          //không được xuống dòng ở &afterDate
          .subscribe(data => {
            console.log('plan condition by user id', data);
            resolve(data);
          });
      });
      listPromise.push(tmp);

      let pages = tmp['totalPages'];
      let pageSize = tmp['size'];

      //Fetch từ trang thứ 2
      for (let page = 2; page <= pages; page++) {
        tmp = await new Promise((resolve, reject) => {
          this.http.get(`${Config.api_endpoint}lich-tap-bay/nguoi-dang-ky-id=${nhacungcapId}?page=${page}&limit=${pageSize}&droneId=&diaDiemId=&trangThai=&batDauTruoc=${batDauDen}&batDauSau=${batDauTu}&ketThucTruoc=&ketThucSau=&nhaCungCapId=${nhacungcapId}`, httpOptions)
            .subscribe(data => {
              console.log('plan condition by user id', data);
              resolve(data);
            });
        });
        listPromise.push(tmp);
      }
    } catch (error) {
      throw error;
    }
    return listPromise;
  }
}
