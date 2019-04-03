import { Injectable } from '@angular/core';
import { Config } from '../services/config';
import { DataService } from './data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

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
export class ChuyenmucService {

  constructor(
    private http: HttpClient,
    private dataService: DataService) { }

  //FETCH TẤT CẢ CHUYÊN MỤC
  async fetchChuyenMuc() {
    let listPromise: any;// lưu lại thông tin fetch toàn bộ
    listPromise = [];
    try {
      let tmp;//đối tượng Promise lưu lại thông tin lần fetch đầu tiên
      tmp = await new Promise((resolve, reject) => {
        this.http.get(`${Config.api_endpoint}chuyen-muc/?page=1&limit=${Config.pageSizeMax}`, httpOptions)// this.http.get()
          .subscribe(data => {                                                                              //.subscribe: khi đã fetch đc dữ liệu
            console.log(data);
            resolve(data);
          });
      });
      listPromise.push(tmp);                      //thêm vào mảng
      let pages = tmp['totalPages'];              // lấy thuộc tính totalPages của tmp
      let pageSize = tmp['size'];                 // lấy thuộc tính size của tmp
      for (let page = 2; page <= pages; page++) { // for để fetch từ trang thứ 2 đến hết
        tmp = new Promise((resolve, reject) => {
          this.http.get(`${Config.api_endpoint}chuyen-muc/?page=${page}&limit=${Config.pageSizeMax}`, httpOptions)
            .subscribe(data => {
              console.log(data);
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

  //FETCH CHUYÊN MỤC THEO ID
  async fetchChuyenMucById(idChuyenMuc) {
    let chuyenMucPromise: any;
    try {
      chuyenMucPromise = new Promise((resolve, reject) => {
        this.http.get(`${Config.api_endpoint}chuyen-muc/${idChuyenMuc}`, httpOptions)
          .subscribe(data => {
            console.log(data);
            resolve(data);
          });
      });
    } catch (error) {
      throw error;
    }
    return chuyenMucPromise;
  }

  // create a CHUYÊN MỤC
  createChuyenMuc(chuyenMuc: ChuyenMuc): Observable<ChuyenMuc> {
    return this.http.post<ChuyenMuc>(`${Config.api_endpoint}chuyen-muc/save`, chuyenMuc, httpOptions);
  }
}
//-------------------------//
export class ChuyenMuc {
  constructor(
    public tenChuyenMuc: string = "",
  ) {}
}