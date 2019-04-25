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
export class ProductService {

  constructor(
    private http: HttpClient,
    private dataService: DataService) { }

    // Get Product
  async fetchProduct() {
    let listPromise: any;
    listPromise = [];
    try {
      let tmp;
      tmp = await new Promise((resolve, reject) => {
        this.http.get(`http://127.0.0.1:8000/api/catagory/page=2&limit=3`)// this.http.get()
          .subscribe(data => {                                                                              //.subscribe: khi đã fetch đc dữ liệu
            console.log('1111', data);
            resolve(data);
          });
      });
      listPromise.push(tmp);                      
      let total = tmp['total'];              
      let pageSize = tmp['pageSize']; 
      let pages = Math.ceil(total/pageSize);
      console.log (pages);               
      // for (let page = 2; page <= pages; page++) {
      //   tmp = new Promise((resolve, reject) => {
      //     this.http.get(`${Config.api_endpoint}chuyen-muc/?page=${page}&limit=${Config.pageSizeMax}`, httpOptions)
      //       .subscribe(data => {
      //         console.log(data);
      //         resolve(data);
      //       });
      //   });
      //   listPromise.push(tmp);
      // }
    } catch (error) {
      throw error;
    }
    return listPromise;
  }
}
