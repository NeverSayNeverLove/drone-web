import { Injectable } from '@angular/core';
import { Config } from '../services/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from '../services/data.service';

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

  getUserDetails(email, password) {
    return this.http.post(`${Config.api_endpoint_khai}login`, {
      email,
      password
    });
  }

  // setToken(key: string, data: any) {
  //   this.dataSrv.setItem(key, data);
  // }

  // getToken(key: string) {
  //   return this.dataSrv.getItem(key);
  // }

  // setTypeToken(key: string, data: any) {
  //   this.dataSrv.setItem(key, data);
  // }

  // getTypeToken(key: string) {
  //   return this.dataSrv.getItem(key);
  // }
}
