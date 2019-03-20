import { Injectable } from '@angular/core';
import { Config } from '../services/config';
import { DataService } from './data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
export class BaivietService {

  constructor(private http: HttpClient,
    private dataService: DataService) { }

  // fetch all POST theo Id người tạo
  async fetchPost() {
    let listPromise: any;
    listPromise = [];
    try {
      let tmp;
      tmp = await new Promise((resolve, reject) => {
        this.http.get(`${Config.api_endpoint}bai-viet/2?page=1&limit=${Config.pageSizeMax}`, httpOptions).subscribe(data => {
          console.log(data);
          resolve(data);
        });
      });
      listPromise.push(tmp);
      let pages = tmp['totalPages'];
      let pageSize = tmp['size'];
      for (let page = 2; page <= pages; page++) {
        tmp = new Promise((resolve, reject) => {
          this.http.get(`${Config.api_endpoint}bai-viet/2?page=${page}&limit=${pageSize}`, httpOptions).subscribe(data => {
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
  
  // 
  getPost() {
    let listPost = [];
    let myItem: any;
    let key;
    key = 'locPost';
    myItem = this.dataService.getItem(key);
    if (myItem) {
      listPost = JSON.parse(myItem);
    }
    return listPost;
  }
  
  setPost(key, listPost) {
    this.dataService.setItem(key, listPost);
  }

  // async fetchChuyenMuc() {
  //   let listPromise: any;// lưu lại thông tin fetch toàn bộ
  //   listPromise = [];
  //   try {
  //     let tmp;//đối tượng Promise lưu lại thông tin lần fetch đầu tiên
  //     tmp = await new Promise((resolve, reject) => {
  //       this.http.get(`${Config.api_endpoint}chuyen-muc/?page=1&limit=${Config.pageSizeMax}`, httpOptions)// this.http.get()
  //       .subscribe(data => {                                                                              //.subscribe: khi đã fetch đc dữ liệu
  //         console.log(data);
  //         resolve(data);
  //       });
  //     });
  //     listPromise.push(tmp);                      //thêm vào mảng
  //     let pages = tmp['totalPages'];              // lấy thuộc tính totalPages của tmp
  //     let pageSize = tmp['size'];                 // lấy thuộc tính size của tmp
  //     for (let page = 2; page <= pages; page++) { // for để fetch từ trang thứ 2 đến hết
  //       tmp = new Promise((resolve, reject) => {
  //         this.http.get(`${Config.api_endpoint}chuyen-muc/?page=${page}&limit=${Config.pageSizeMax}`, httpOptions)
  //         .subscribe(data => {
  //           console.log(data);
  //           resolve(data);
  //         });
  //       });
  //       listPromise.push(tmp);
  //     }
  //   } catch (error) {
  //     throw error;
  //   }
  //   return listPromise;
  // }
  
  
}
