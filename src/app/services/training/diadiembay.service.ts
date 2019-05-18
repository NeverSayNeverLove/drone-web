import { Injectable } from '@angular/core';
import { Config } from '../helper/config';
import { DataService } from '../helper/data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserService, User } from '../auth/user.service';

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
export class DiadiembayService {

  constructor(
    private http: HttpClient,
    private dataSrv: DataService,
    private userSrv: UserService,
  ) { }
   //FETCH ĐỊA ĐIỂM BAY THEO ID
   async fetchFlyPlaceById(id){
    let flyPlacePromise: any;
    try{
      flyPlacePromise = await new Promise ((resolve, reject) =>{
        this.http.get(`${Config.api_endpoint}dia-diem-bay/${id}`, httpOptions)
        .subscribe(data => {
          console.log('Dia_diem_bay by Id',data);
          resolve(data);
        });
      });
    }catch(error){
      throw error;
    }
    return flyPlacePromise;
  }

  //FETCH LIST ĐỊA ĐIỂM BAY THEO NHÀ CUNG CẤP ID
  async fetchFlyPlaceByNccId(nhacungcapId) {
    let listPromise: any;
    listPromise = [];
    try {
      let tmp;
      tmp = await new Promise((resolve, reject) => {
        this.http.get(`${Config.api_endpoint}dia-diem-bay/nha-cung-cap-id=${nhacungcapId}?page=1&limit=${Config.pageSizeMax}`, httpOptions).subscribe(data => {
          console.log('List Dia_diem_bay by Nha_cung_cap_Id page 1',data);
          resolve(data);
        });
      });
      listPromise.push(tmp);
      let pages = tmp['totalPages'];
      let pageSize = tmp['size'];
      for (let page = 2; page <= pages; page++) {
        tmp = await new Promise((resolve, reject) => {
          this.http.get(`${Config.api_endpoint}dia-diem-bay/nha-cung-cap-id=${nhacungcapId}?page=${page}&limit=${pageSize}`, httpOptions).subscribe(data => {
            console.log('List Dia_diem_bay by Nha_cung_cap_Id',data);
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
  
  //FETCH LIST ĐỊA ĐIỂM BAY THEO NHÀ CUNG CẤP ID
  async fetchAllPlace() {
    let listPromise: any;
    listPromise = [];
    try {
      let tmp;
      tmp = await new Promise((resolve, reject) => {
        this.http.get(`${Config.api_endpoint}dia-diem-bay/all?page=1&limit=${Config.pageSizeMax}`, httpOptions).subscribe(data => {
          resolve(data);
        });
      });
      listPromise.push(tmp);
      let pages = tmp['totalPages'];
      let pageSize = tmp['size'];
      for (let page = 2; page <= pages; page++) {
        tmp = await new Promise((resolve, reject) => {
          this.http.get(`${Config.api_endpoint}dia-diem-bay/all?page=${page}&limit=${pageSize}`, httpOptions).subscribe(data => {
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

  getPlaceList() {
    return this.dataSrv.getItem('placeTraning');
  }
  
   // create a POST
   createDiadiemBay(diadiembay: DiaDiemBay): Observable<DiaDiemBay> {
    return this.http.post<DiaDiemBay>(`${Config.api_endpoint}dia-diem-bay/save`, diadiembay, httpOptions);
  }

  public findDiaDiemBay(id): DiaDiemBay {
      return this.dataSrv.getItem('placeTraning').find(pl => pl.id == id);
  }

}
export class DiaDiemBay {
  constructor(
    public diaChi: string = "",
    public id: number = 0,
    public nhaCungCap: User
  ){};
}