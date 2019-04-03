import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Post } from './baiviet.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //To send PostID
  private postIDSource = new BehaviorSubject<number>(0);
  currPostID = this.postIDSource.asObservable();
  constructor() { }
  
  public storage: Map<string, any> = new Map();

  public setItem(key: string, data: any) {
    this.storage.set(key, JSON.stringify(data));
  }

  public getItem(key: string): any {
    return this.storage.get(key);
  }
  //To send PostID
  public sendPostID(id: number) {
    this.postIDSource.next(id);  //send: next()
  }
}
