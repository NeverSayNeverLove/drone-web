import { Injectable } from '@angular/core';
import { Config } from '../helper/config';
import { DataService } from '../helper/data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': ''
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
    private dataService: DataService,) {
    }
  
  //FETCH ALL USER
  async fetchAllUser(token) {
    let listPromise: any;
    listPromise = [];
    try {
      let tmp;
      tmp = await new Promise((resolve, reject) => {
        this.http.get(`${Config.api_endpoint_khai}user/page=1&limit=${Config.pageSizeMax}`, httpOptions).subscribe(data => {
          console.log('data:', data);
          resolve(data);
        });
      });
      listPromise.push(tmp);
      let pages = tmp['totalPages'];
      let pageSize = tmp['size'];
      for (let page = 2; page <= pages; page++) {
        tmp = await new Promise((resolve, reject) => {
          this.http.get(`${Config.api_endpoint_khai}user/page=${page}&limit=${pageSize}`, httpOptions).subscribe(data => {
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

  async fetchAllSup(token) {
    const httpHeader = {
      headers: new HttpHeaders({
        'Authorization': token
      })
    };
    let listPromise: any;
    listPromise = [];
    try {
      let tmp;
      tmp = await new Promise((resolve, reject) => {
        this.http.get(`${Config.api_endpoint_khai}userssup/page=1&limit=${Config.pageSizeMax}`, httpHeader).subscribe(data => {
          resolve(data);
        });
      });
      listPromise.push(tmp['data']);
      let total = tmp['data']['total'];
      let pageSize = tmp['data']['pageSize'];
      let pages = Math.ceil(total / pageSize);
      // console.log('tmp:--', tmp, total, pageSize, pages)
      for (let page = 2; page <= Config.pages; page++) {
        tmp = await new Promise((resolve, reject) => {
          this.http.get(`${Config.api_endpoint_khai}userssup/page=${page}&limit=${pageSize}`, httpHeader).subscribe(data => {
            resolve(data);
          });
        });
        listPromise.push(tmp['data']);
      }
    } catch (error) {
      throw error;
    }
    return listPromise;
  }

  async whoIAm(token: string) {
    let listPromise: any = null;
    const httpHeader = {
      headers: new HttpHeaders({
        'Authorization': token
      })
    };
    try{
      listPromise = await new Promise((resolve, reject) => {
        this.http.get(`${Config.api_endpoint_khai}user`, httpHeader).subscribe(data => {
          resolve(data);
        });
      });
    } catch (error) {
      throw error;
    }
    return listPromise
  }
  
  public getCurrentUser(key) {
    let user: User = this.dataService.getItemLocal(key);
    return user;
  }

  public setCurrentUser(key, user) {
    this.dataService.setItemLocal(key, (user));
  }

  public getCurrentUserID(key) {
    let ID: number = this.dataService.getItemLocal(key).id;
    return ID;
  }

  public get isSup(): boolean {
    return this.dataService.getItemLocal('CurrentUser')['vai_tro_id'] == '1';
  }

  public get isUser(): boolean {
    return this.dataService.getItemLocal('CurrentUser')['vai_tro_id'] == '3';
  }

  public get isAdmin(): boolean {
    return this.dataService.getItemLocal('CurrentUser')['vai_tro_id'] == '2';
  }

  public getAccessToken(): string {
    return this.dataService.getItemLocal('access_token')
  }

  public getTypeToken(): string {
    return this.dataService.getItemLocal('token_type')
  }

  public getToken(): string {
    return this.dataService.getItemLocal('token_type') + ' ' + this.dataService.getItemLocal('access_token');
  }

  public findNhaCungCap(id) {
      return this.dataService.getItem('SupplierList').find(ncc => ncc.id == id);
  }

  public getSupList() {
    return this.dataService.getItem('SupplierList');
  }
}

export class User {
  constructor(
    public diaChi: string = "",
    public email: string = "",
    public hoTen: string = "",
    public id: number = 0,
    public soDienThoai: string = "",
    public vaiTro: VaiTro = {id: 4, tenVaiTro: "user"},
    // public password: string
  ) {}
}

export class VaiTro {
  constructor(
    public id: number = 4,
    public tenVaiTro: string = "user",
  ) {}
}