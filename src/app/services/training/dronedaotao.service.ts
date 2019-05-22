import { Injectable } from '@angular/core';
import { Config } from '../helper/config';
import { DataService } from '../helper/data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../auth/user.service';

const httpOptions = {
  headers: new HttpHeaders({
    // 'accept': 'application/json',
    // 'accept-language': 'en-US,en;q=0.9,vi;q=0.8,ja;q=0.7',
    // 'x-requested-with': 'XMLHttpRequest'
  })
};
@Injectable({
  providedIn: 'root'
})
export class DronedaotaoService {

  constructor(
    private http: HttpClient,
    private dataSrv: DataService,
  ) { }
  
  //FETCH ALL DRONE ĐÀO TẠO
  async fetchAllDrone() {
    let listPromise: any;
    listPromise = [];
    try {
      let tmp;
      tmp = await new Promise((resolve, reject) => {
        // fake can bo nha cung cap de lay tat ca drone
        this.http.get(`${Config.api_endpoint}drone-dao-tao/all?page=1&limit=${Config.pageSizeMax}`, httpOptions).subscribe(data => {
          resolve(data);
        });
      });
      listPromise.push(tmp);
      let pages = tmp['totalPages'];
      let pageSize = tmp['size'];
      for (let page = 2; page <= Config.pages; page++) {
        tmp = await new Promise((resolve, reject) => {
          // fake can bo nha cung cap de lay tat ca drone
          this.http.get(`${Config.api_endpoint}drone-dao-tao/all?page=${page}&limit=${pageSize}`, httpOptions).subscribe(data => {
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

  //FETCH  LIST DRONE ĐÀO TẠO THEO NHÀ CUNG CẤP ID
  async fetchDroneByNccId(nhacungcapId) {
    let listPromise: any;
    listPromise = [];
    try {
      let tmp;
      tmp = await new Promise((resolve, reject) => {
        this.http.get(`${Config.api_endpoint}drone-dao-tao/nha-cung-cap-id=${nhacungcapId}?page=1&limit=${Config.pageSizeMax}`, httpOptions).subscribe(data => {
          resolve(data);
        });
      });
      listPromise.push(tmp);
      let pages = tmp['totalPages'];
      let pageSize = tmp['size'];
      for (let page = 2; page <= Config.pages; page++) {
        tmp = await new Promise((resolve, reject) => {
          this.http.get(`${Config.api_endpoint}drone-dao-tao/nha-cung-cap-id=${nhacungcapId}?page=${page}&limit=${pageSize}`, httpOptions).subscribe(data => {
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
  async fetchDroneById(id) {
    let droneDaotaoPromise: any;
    try {
      droneDaotaoPromise = await new Promise((resolve, reject) => {
        this.http.get(`${Config.api_endpoint}drone-dao-tao/${id}`, httpOptions)
          .subscribe(data => {
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
  }

  public findDrone(id): DroneDaoTao {
      return this.dataSrv.getItem('droneTraning').find(dr => dr.id == id);
  }

}
export class DroneDaoTao {
  constructor(
    public tenDrone: string = "",
    public moTa: string = "",
    public id: number = 0,
    public maDrone: string = "",
    public nhaCungCap: User
  ) {}
}
