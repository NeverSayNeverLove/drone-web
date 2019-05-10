import { Injectable } from '@angular/core';
import { Config } from '../services/config';
import { DataService } from './data.service';
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

  currentUser;

  constructor(private http: HttpClient,
    private dataService: DataService,) {
      this.currentUser = this.dataService.getItemLocal('CurrentUser');
    }
  
  //FETCH ALL USER
  async fetchAllUser() {
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
  
  
  getCurrentUser(key) {
    let user: User = this.dataService.getItemLocal(key);
    return user;
  }

  setCurrentUser(key, user) {
    this.dataService.setItemLocal(key, (user));
  }

  public get isSup(): boolean {
    return this.currentUser['vai_tro_id'] == '1';
  }

  public get isUser(): boolean {
    return this.currentUser['vai_tro_id'] == '3';
  }

  public get isAdmin(): boolean {
    return this.currentUser['vai_tro_id'] == '2';
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