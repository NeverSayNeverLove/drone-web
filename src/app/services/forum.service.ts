import { Injectable } from '@angular/core';
import { Config } from '../services/config';
import { DataService } from './data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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
export class ForumService {

  constructor(
    private http: HttpClient,
    private dataService: DataService
  ) { }

  //FETCH TẤT CẢ CHỦ ĐỀ CÂU HỎI FORUM
  async fetchChudeForum() {
    let listPromise: any;
    try {
      listPromise = await new Promise((resolve, reject) => {
        this.http.get(`${Config.api_endpoint}chu-de-forum/`, httpOptions).subscribe(data => {
          // console.log('List chude-forum', data);
          resolve(data);
        });
      });

    } catch (error) {
      throw error;
    }
    // console.log('listPromise',listPromise);
    return listPromise;
  }
  //FETCH CHỦ ĐỀ CÂU HỎI FORUM THEO ID
  async fetchChudeForumById(chudeForumId) {
    let listPromise: any;
    try {
      listPromise = await new Promise((resolve, reject) => {
        this.http.get(`${Config.api_endpoint}chu-de-forum/${chudeForumId}`, httpOptions).subscribe(data => {
          // console.log('List chude-forum by ID', data);
          resolve(data);
        });
      });
;
    } catch (error) {
      throw error;
    }
    return listPromise;
  }
  //FETCH LIST CÂU HỎI FORUM, PHÂN TRANG
  async fetchCauhoiForum() {
    let listPromise: any;
    listPromise = [];
    try {
      let tmp;
      tmp = await new Promise((resolve, reject) => {
        this.http.get(`${Config.api_endpoint}cau-hoi-forum/?page=1&limit=${Config.pageSizeMax}`, httpOptions).subscribe(data => {
          // console.log('List cau-hoi-forum page 1', data);
          resolve(data);
        });
      });
      listPromise.push(tmp);
      let pages = tmp['totalPages'];
      let pageSize = tmp['size'];
      for (let page = 2; page <= pages; page++) {
        tmp = await new Promise((resolve, reject) => {
          this.http.get(`${Config.api_endpoint}cau-hoi-forum/?page=${page}&limit=${pageSize}`, httpOptions).subscribe(data => {
            // console.log('List cau-hoi-forum', data);
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
  //FETCH LIST CÂU HỎI FORUM THEO CHỦ ĐỀ ID, PHÂN TRANG
  async fetchCauhoiByChudeId(chudeId) {
    let listPromise: any;
    listPromise = [];
    try {
      let tmp;
      tmp = await new Promise((resolve, reject) => {
        this.http.get(`${Config.api_endpoint}cau-hoi-forum/chu-de-id=${chudeId}?page=1&limit=${Config.pageSizeMax}`, httpOptions).subscribe(data => {
          console.log('List cau-hoi by chu-de-Id page 1', data);
          resolve(data);
        });
      });
      listPromise.push(tmp);
      let pages = tmp['totalPages'];
      let pageSize = tmp['size'];
      for (let page = 2; page <= pages; page++) {
        tmp = await new Promise((resolve, reject) => {
          this.http.get(`${Config.api_endpoint}cau-hoi-forum/chu-de-id=${chudeId}?page=${page}&limit=${pageSize}`, httpOptions).subscribe(data => {
            console.log('List cau-hoi by chu-de-Id ', data);
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
  //FETCH LIST CÂU HỎI FORUM THEO NGƯỜI ĐẶT ID, PHÂN TRANG
  async fetchCauhoiByNguoidatId(nguoidatId) {
    let listPromise: any;
    listPromise = [];
    try {
      let tmp;
      tmp = await new Promise((resolve, reject) => {
        this.http.get(`${Config.api_endpoint}cau-hoi-forum/nguoi-dat-id=${nguoidatId}?page=1&limit=${Config.pageSizeMax}`, httpOptions).subscribe(data => {
          console.log('List cau-hoi by nguoidat-Id page 1', data);
          resolve(data);
        });
      });
      listPromise.push(tmp);
      let pages = tmp['totalPages'];
      let pageSize = tmp['size'];
      for (let page = 2; page <= pages; page++) {
        tmp = new Promise((resolve, reject) => {
          this.http.get(`${Config.api_endpoint}cau-hoi-forum/nguoi-dat-id=${nguoidatId}?page=${page}&limit=${pageSize}`, httpOptions).subscribe(data => {
            console.log('List cau-hoi by nguoidat-Id ', data);
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
  //FETCH CÂU HỎI FORUM THEO ID
  async fetchCauhoiById(Id) {
    let listPromise: any;
    try {
      let tmp;
      tmp = await new Promise((resolve, reject) => {
        this.http.get(`${Config.api_endpoint}cau-hoi-forum/${Id}`, httpOptions).subscribe(data => {
          console.log('Cau hoi by Id', data);
          resolve(data);
        });
      });

    } catch (error) {
      throw error;
    }
    return listPromise;
  }
  //FETCH TRẢ LỜI FORUM THEO ID
  async fetchTraloiById(Id) {
    let listPromise: any;
    try {
      let tmp;
      tmp = await new Promise((resolve, reject) => {
        this.http.get(`${Config.api_endpoint}tra-loi-forum/${Id}`, httpOptions).subscribe(data => {
          console.log('Tra loi by Id', data);
          resolve(data);
        });
      });

    } catch (error) {
      throw error;
    }
    return listPromise;
  }
  //FETCH LIST TRẢ LỜI THEO CÂU HỎI ID, PHÂN TRANG
  async fetchTraloiByCauhoiId(cauhoiId) {
    let listPromise: any;
    listPromise = [];
    try {
      let tmp;
      tmp = await new Promise((resolve, reject) => {
        this.http.get(`${Config.api_endpoint}tra-loi-forum/cau-hoi-id=${cauhoiId}?page=1&limit=${Config.pageSizeMax}`, httpOptions).subscribe(data => {
          console.log('List tra loi by cau hoi id page 1', data);
          resolve(data);
        });
      });
      listPromise.push(tmp);
      let pages = tmp['totalPages'];
      let pageSize = tmp['size'];
      for (let page = 2; page <= pages; page++) {
        tmp = await new Promise((resolve, reject) => {
          this.http.get(`${Config.api_endpoint}cau-hoi-forum/nguoi-dat-id=${cauhoiId}?page=${page}&limit=${pageSize}`, httpOptions).subscribe(data => {
            console.log('List tra loi by cau hoi id ', data);
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

  //FETCH LIST TRẢ LỜI THEO NGƯỜI TRẢ LỜI ID, PHÂN TRANG
  async fetchTraloiByNguoiTraloiId(nguoiTraloiId) {
    let listPromise: any;
    listPromise = [];
    try {
      let tmp;
      tmp = await new Promise((resolve, reject) => {
        this.http.get(`${Config.api_endpoint}tra-loi-forum/nguoi-tra-loi-id=${nguoiTraloiId}?page=1&limit=${Config.pageSizeMax}`, httpOptions).subscribe(data => {
          console.log('List tra_loi by nguoi_tra_loi_id page 1', data);
          resolve(data);
        });
      });
      listPromise.push(tmp);
      let pages = tmp['totalPages'];
      let pageSize = tmp['size'];
      for (let page = 2; page <= pages; page++) {
        tmp = new Promise((resolve, reject) => {
          this.http.get(`${Config.api_endpoint}cau-hoi-forum/nguoi-dat-id=${nguoiTraloiId}?page=${page}&limit=${pageSize}`, httpOptions).subscribe(data => {
            console.log('List tra_loi by nguoi_tra_loi_id ', data);
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

  // create 1 chủ đề câu hỏi forum
  createChuDeForum(chuDeForum: ChuDeForum): Observable<ChuDeForum> {
    return this.http.post<ChuDeForum>(`${Config.api_endpoint}chu-de-forum/save`, chuDeForum, httpOptions);
  }
  // create 1 câu hỏi forum
  createCauHoiForum(cauHoiForum: CauHoiForum): Observable<CauHoiForum> {
    return this.http.post<CauHoiForum>(`${Config.api_endpoint}cau-hoi-forum/save`, cauHoiForum, httpOptions);
  }
  // CREATE 1 trả lời forum
  createTraLoiForum(traLoiForum: TraLoiForum): Observable<TraLoiForum> {
    return this.http.post<TraLoiForum>(`${Config.api_endpoint}tra-loi-forum/save`, traLoiForum, httpOptions);
  }
   // UPDATE 1 trả lời forum
   updateTraLoiForum(traLoiForum: TraLoiForum): Observable<TraLoiForum> {
    return this.http.post<TraLoiForum>(`${Config.api_endpoint}tra-loi-forum/update`, traLoiForum, httpOptions);
  }

}
//--------------------------------//
export class ChuDeForum {
  constructor(
    public tenChuDeCauHoi: string = "",
    public id: number = 0,
  ) { }
}
export class CauHoiForum {
  constructor(
    public tieuDe: string = "",
    public noiDung: string = "",
    public nguoiDatId: number = 1,
    public chuDeId: number = 1,
    public id: number = 0,
  ) { }
}
export class TraLoiForum {
  constructor(
    public noiDung: string = "",
    public nguoiTraLoiId: number = 1,
    public cauHoiId: number = 1,
    public id: number = 0,
  ) { }
}

