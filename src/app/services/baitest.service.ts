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
export class BaitestService {

  constructor(
    private http: HttpClient,
    private dataService: DataService
  ){}

  //FETCH BÀI TEST THEO ID
  async fetchTestById(idTest){
    let testPromise: any;
    try{
      testPromise = new Promise ((resolve, reject) =>{
        this.http.get(`${Config.api_endpoint}bai-kiem-tra/${idTest}`, httpOptions)
        .subscribe(data => {
          console.log('Bai test theo id',data);
          resolve(data);
        });
      });
    }catch(error){
      throw error;
    }
    return testPromise;
  }
  //FETCH BÀI TEST THEO NHÀ CUNG CẤP ID
  async fetchTestByNhacungcapId(nhacungcapId) {
    let listPromise: any;
    listPromise = [];
    try {
      let tmp;
      tmp = await new Promise((resolve, reject) => {
        this.http.get(`${Config.api_endpoint}bai-kiem-tra/nha-cung-cap-id=${nhacungcapId}?page=1&limit=${Config.pageSizeMax}`, httpOptions)
        .subscribe(data => {
          console.log('List bai_test by nha_cung_cap_Id page 1',data);
          resolve(data);
        });
      });
      listPromise.push(tmp);
      let pages = tmp['totalPages'];
      let pageSize = tmp['size'];
      for (let page = 2; page <= pages; page++) {
        tmp = new Promise((resolve, reject) => {
          this.http.get(`${Config.api_endpoint}bai-kiem-tra/nha-cung-cap-id=${nhacungcapId}?page=${page}&limit=${pageSize}`, httpOptions).subscribe(data => {
            console.log('List bai_test by nha_cung_cap_Id',data);
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
