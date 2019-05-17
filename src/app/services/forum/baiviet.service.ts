import { Injectable } from '@angular/core';
import { Config } from '../helper/config';
import { DataService } from '../helper/data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs'; 


const httpOptions = {
  headers: new HttpHeaders({
    'accept': 'application/json',
    // 'accept-language': 'en-US,en;q=0.9,vi;q=0.8,ja;q=0.7',
    // 'x-requested-with': 'XMLHttpRequest'
  })
};

@Injectable({
  providedIn: 'root'
})
export class BaivietService {

  constructor(private http: HttpClient,
    private dataService: DataService
) { }

  //FETCH LIST POST THEO ID NGƯỜI TẠO
  async fetchPostByIdNguoiTao(idNguoiTao) {
    let listPromise: any;
    listPromise = [];
    try {
      let tmp;
      tmp = await new Promise((resolve, reject) => {
        this.http.get(`${Config.api_endpoint}bai-viet/nguoi-tao/${idNguoiTao}?page=1&limit=${Config.pageSizeMax}`, httpOptions).subscribe(data => {
          // console.log(data);
          resolve(data);
        });
      });
      listPromise.push(tmp);
      let pages = tmp['totalPages'];
      let pageSize = tmp['size'];
      for (let page = 2; page <= pages; page++) {
        tmp = await new Promise((resolve, reject) => {
          this.http.get(`${Config.api_endpoint}bai-viet/nguoi-tao/${idNguoiTao}?page=${page}&limit=${pageSize}`, httpOptions).subscribe(data => {
            // console.log(data);
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

  //FETCH BÀI VIẾT THEO ID
  async fetchPostById(idPost){
    let chuyenMucPromise: any;
    try{
      chuyenMucPromise = new Promise ((resolve, reject) =>{
        this.http.get(`${Config.api_endpoint}bai-viet/${idPost}`, httpOptions)
        .subscribe(data => {
          console.log(data);
          resolve(data);
        });
      });
    }catch(error){
      throw error;
    }
    return chuyenMucPromise;
  }

  //FETCH BÀI VIẾT THEO ID CHUYÊN MỤC
  async fetchPostByIdChuyenMuc(idChuyenMuc) {
    let listPromise: any;
    listPromise = [];
    try {
      let tmp;
      tmp = await new Promise((resolve, reject) => {
        this.http.get(`${Config.api_endpoint}bai-viet/chuyen-muc/${idChuyenMuc}?page=1&limit=${Config.pageSizeMax}`, httpOptions).subscribe(data => {
          // console.log('data: ', data);
          resolve(data);
        });
      });
      listPromise.push(tmp);
      let pages = tmp['totalPages'];
      let pageSize = tmp['size'];
      for (let page = 2; page <= pages; page++) {
        tmp = await new Promise((resolve, reject) => {
          this.http.get(`${Config.api_endpoint}bai-viet/chuyen-muc/${idChuyenMuc}?page=${page}&limit=${pageSize}`, httpOptions).subscribe(data => {
            // console.log('data: ', data);
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

  //FETCH BÀI VIẾT THEO LIST ID
  async fetchPostByListId(listId) {
    let listPromise: any;
    listPromise = [];
    try {
      let tmp;
      tmp = await new Promise((resolve, reject) => {
        this.http.get(`${Config.api_endpoint}bai-viet/list-id?listId=${listId}&page=1&limit=${Config.pageSizeMax}`, httpOptions).subscribe(data => {
          console.log(data);
          resolve(data);
        });
      });
      listPromise.push(tmp);
      let pages = tmp['totalPages'];
      let pageSize = tmp['size'];
      for (let page = 2; page <= pages; page++) {
        tmp = new Promise((resolve, reject) => {
          this.http.get(`${Config.api_endpoint}bai-viet/list-id?listId=${listId}&page=${page}&limit=${pageSize}`, httpOptions).subscribe(data => {
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
  //FOMAT DATE
  fomatDate(date: Date) {
    let fomated_Date = "";
    fomated_Date = date.getDate() +"-"+ (date.getMonth() + 1) +"-"+ date.getFullYear();
    return fomated_Date;
  }

  //FETCH BÀI VIẾT THEO ĐIỀU KIỆN: Limit, ChuyenMucId, NguoiTaoId, trangThai, afterDate, beforeDate
  async fetchPostByCondition(chuyenMucId, nguoiTaoId, trangThai, start: Date, end: Date) {
    let listPromise: any;
    listPromise = [];
    try {
      let afterDate = this.fomatDate(start);
      let beforeDate = this.fomatDate(end);
      let tmp;
      tmp = await new Promise((resolve, reject) => {
        this.http.get(`${Config.api_endpoint}bai-viet/dieu-kien?page=1&limit=${Config.pageSizeMax}
        &chuyenMucId=${chuyenMucId}&nguoiTaoId=${nguoiTaoId}&trangThai=${trangThai}&afterDate=${afterDate}&beforeDate=${beforeDate}`, httpOptions)
        //không được xuống dòng ở &afterDate
        .subscribe(data => {
            console.log('data dieu kien', data);
          resolve(data);
        });
      });
      
      listPromise.push(tmp);
      let pages = tmp['totalPages'];
      let pageSize = tmp['size'];

      //Fetch từ trang thứ 2
      for (let page = 2; page <= pages; page++) {
        tmp = new Promise((resolve, reject) => {
          this.http.get(`${Config.api_endpoint}bai-viet/dieu-kien?page=${page}&limit=${pageSize}
          &chuyenMucId=${chuyenMucId}&nguoiTaoId=${nguoiTaoId}&trangThai=${trangThai}&afterDate=${afterDate}&beforeDate=${beforeDate}`, httpOptions)
          .subscribe(data => {
            console.log('dt dieu kien', data);
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

  private handleError() {
  };
  
  // create a POST
  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${Config.api_endpoint}bai-viet/save`, post, httpOptions);
    // .pipe(catchError(this.handleError);
  }
  
  // 
  getPost(key: string) {
    let listPost = this.dataService.getItem(key);
    return listPost ? listPost : [];
  }
  
  setPost(listPost, key: string) {
    this.dataService.setItem(key, listPost);
  }
  
  
}


export class Post {
  constructor(
      public tieuDe: string = "",
      public noiDung: string = "",
      public tag: any = "",
      public trangThai: boolean = false,
      public chuyenMucId: number = 1,
      public nguoiTaoId: number = 1,
      public id: number = 0,) {
  }
}