import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Post } from './baiviet.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //To send PostID
  private idSource = new BehaviorSubject<number>(0); 
  currID = this.idSource.asObservable();// người đưa thư        
  constructor() { }
  
  public storage: Map<string, any> = new Map();

  public setItem(key: string, data: any) {
    this.storage.set(key, JSON.stringify(data));
  }

  public getItem(key: string): any {
    return this.storage.get(key);
  }

  public setItemLocal(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public getItemLocal(key: string): any {
    return localStorage.getItem(key);
  }

  //To send ID
  public sendPostID(id: number) {
    this.idSource.next(id);  //send: next(): đưa cho currId để mang đi
  }
}
