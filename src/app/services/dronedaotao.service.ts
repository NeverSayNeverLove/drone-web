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
export class DronedaotaoService {

  constructor(
    private http: HttpClient,
    private dataService: DataService
  ) { }
  //FETCH  LIST DRONE ĐÀO TẠO THEO NHÀ CUNG CẤP ID
  async fetchDroneDaotaoByNhacungcapId(nhacungcapId) {
    let listPromise: any;
    listPromise = [];
    try {
      let tmp;
      tmp = await new Promise((resolve, reject) => {
        this.http.get(`${Config.api_endpoint}drone-dao-tao/nha-cung-cap-id=${nhacungcapId}?page=1&limit=${Config.pageSizeMax}`, httpOptions).subscribe(data => {
          console.log('List Drone_dao_tao by Nha_cung_cap_Id page 1', data);
          resolve(data);
        });
      });
      listPromise.push(tmp);
      let pages = tmp['totalPages'];
      let pageSize = tmp['size'];
      for (let page = 2; page <= pages; page++) {
        tmp = await new Promise((resolve, reject) => {
          this.http.get(`${Config.api_endpoint}drone-dao-tao/nha-cung-cap-id=${nhacungcapId}?page=${page}&limit=${pageSize}`, httpOptions).subscribe(data => {
            console.log('List Drone_dao_tao by Nha_cung_cap_Id', data);
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
  //FETCH DRONE THEO ID
  async fetchDroneDaotaoById(id) {
    let droneDaotaoPromise: any;
    try {
      droneDaotaoPromise = await new Promise((resolve, reject) => {
        this.http.get(`${Config.api_endpoint}drone-dao-tao/${id}`, httpOptions)
          .subscribe(data => {
            console.log('Drone_dao_tao by Id', data);
            resolve(data);
          });
      });
    } catch (error) {
      throw error;
    }
    return droneDaotaoPromise;
  }

  // create a POST
  createPost(dronedaotao: DroneDaoTao): Observable<DroneDaoTao> {
    return this.http.post<DroneDaoTao>(`${Config.api_endpoint}drone-dao-tao/save`, dronedaotao, httpOptions);
    // .pipe(catchError(this.handleError);
  }

}
export class DroneDaoTao {
  constructor(
    public tenDrone: string = "",
    public moTa: string = "",
    public nhaCungCapId: number = 0,
    public id: number = 0,
  ) {}
}
