import { Injectable } from '@angular/core';
import { Config } from '../services/config';
import { DataService } from './data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'accept': 'application/json',
//     'accept-language': 'en-US,en;q=0.9,vi;q=0.8,ja;q=0.7',
//     'x-requested-with': 'XMLHttpRequest'
//   })
// };


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
    private dataService: DataService) { }

  // Get All Product
  async fetchProduct() {
    let listPromise: any;
    listPromise = [];
    try {
      let tmp;
      tmp = await new Promise((resolve, reject) => {
        this.http.get(`${Config.api_endpoint_khai}product/page=1&limit=${Config.pageSizeMax}`)// this.http.get()
          .subscribe(data => {                                                                              //.subscribe: khi đã fetch đc dữ liệu
            resolve(data);
          });
      });
      listPromise.push(tmp);

      let total: number = tmp['data']['total'];
      let pageSize: number = 0;
      pageSize = +tmp['data']['pageSize'];
      let pages: number = Math.ceil(total / pageSize);

      for (let page = 2; page <= pages; page++) {
        tmp = await new Promise((resolve, reject) => {
          this.http.get(`${Config.api_endpoint_khai}product/page=${page}&limit=${Config.pageSizeMax}`)
            .subscribe(data => {
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
