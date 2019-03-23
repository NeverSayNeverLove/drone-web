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
export class LichtapbayService {

  constructor(
    private http: HttpClient,
    private dataService: DataService
  ) {}
  //FETCH LỊCH TẬP BAY THEO ID
  async fetchFlyPlanById(id){
    let flyPlanPromise: any;
    try{
      flyPlanPromise = new Promise ((resolve, reject) =>{
        this.http.get(`${Config.api_endpoint}lich-tap-bay/${id}`, httpOptions)
        .subscribe(data => {
          console.log(data);
          resolve(data);
        });
      });
    }catch(error){
      throw error;
    }
    return flyPlanPromise;
  }
}
