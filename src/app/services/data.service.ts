import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Post } from './baiviet.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //To send PostID
  private postIDSource = new BehaviorSubject<number>(0);
  currPostID = this.postIDSource.asObservable();        //
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

  //To send PostID
  public sendPostID(id: number) {
    this.postIDSource.next(id);  //send: next()
  }
}
