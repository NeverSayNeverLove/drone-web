import { Injectable } from '@angular/core';
import { Config } from '../services/config';
import { DataService } from './data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': ''
    // 'accept': 'application/json',
    // 'accept-language': 'en-US,en;q=0.9,vi;q=0.8,ja;q=0.7',
    // 'x-requested-with': 'XMLHttpRequest'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // users/page={page}&amp;limit={size}

  constructor(private http: HttpClient,
    private dataService: DataService,) { }

  
  //FETCH ALL USER
  async fetchAllUser() {
    let listPromise: any;
    listPromise = [];
    try {
      let tmp;
      tmp = await new Promise((resolve, reject) => {
        this.http.get(`${Config.api_endpoint_khai}users/page=1&limit=${Config.pageSizeMax}`, httpOptions).subscribe(data => {
          console.log('data:', data);
          resolve(data);
        });
      });
      listPromise.push(tmp);
      let pages = tmp['totalPages'];
      let pageSize = tmp['size'];
      for (let page = 2; page <= pages; page++) {
        tmp = await new Promise((resolve, reject) => {
          this.http.get(`${Config.api_endpoint_khai}users/page=${page}&limit=${pageSize}`, httpOptions).subscribe(data => {
            console.log('data:', data);
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

export class User {
  constructor(
    public diaChi: string = "",
    public email: string = "",
    public hoTen: string = "",
    public id: number = 0,
    public soDienThoai: string = "",
    public vaiTro: VaiTro = {id: 4, tenVaiTro: "user"}
  ) {}
}

export class VaiTro {
  constructor(
    public id: number = 4,
    public tenVaiTro: string = "user",
  ) {}
}