import { Injectable } from '@angular/core';
import { Config } from '../helper/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from '../helper/data.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({
    // 'Authorization': ''
    'accept': 'application/json',
    'accept-language': 'en-US,en;q=0.9,vi;q=0.8,ja;q=0.7',
    'x-requested-with': 'XMLHttpRequest'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private dataSrv: DataService,) { }

  login(email: string, password: string) {
    return this.http.post<{access_token:  string}>(`${Config.api_endpoint_khai}login`, {email: email, password: password})
    .pipe(tap(res => {
      // Luu token nhan dc tu server vao localStorage
      this.dataSrv.setItemLocal('access_token', res.access_token)
    }));
  }



  register(email:string, password:string) {
    return this.http.post<{access_token: string}>(`${Config.api_endpoint_khai}signup`, {email, password}).pipe(tap(res => {
      this.login(email, password)
    }))
  }

  logout() {
    // Xoa toan bo localStorage
    // localStorage.clear();
    this.dataSrv.removeItemLocal('access_token')
    this.dataSrv.removeItemLocal('token_type')
    this.dataSrv.removeItemLocal('CurrentUser')
  }

  // Bien kiem tra xem da login chua, neu login roi se co access_token
  get loggedIn(): boolean{
    return this.dataSrv.getItemLocal('access_token') !=  null;
  }

  getPriorUrl(key) {
    let url = this.dataSrv.getItem(key);
    return url ? url : '';
  }
}
