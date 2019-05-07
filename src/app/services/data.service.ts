import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //To send PostID
  private idSource = new BehaviorSubject<number>(0); 
  currID = this.idSource.asObservable();// người đưa thư 

  private cartSource = new BehaviorSubject<Item[]>(null);
  currCart = this.cartSource.asObservable();

  constructor() { }
  
  public storage: Map<string, any> = new Map();

  public setItem(key: string, data: any) {
    this.storage.set(key, JSON.stringify(data));
  }

  public getItem(key: string): any {
    return this.storage.get(key);
    //trả về string
  }

  public getItem1(key: string) {
    let listPost = [];
    let myItem: any;
    myItem = this.storage.get(key);
    if (myItem) {
      listPost = JSON.parse(myItem);
      //trả về JSON
    }
    return listPost;
  }


  //local cache
  public setItemLocal(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public getItemLocal(key: string): any {
    let itemList = [];
    let myItem: any;
    myItem = localStorage.getItem(key); // trả về string
    if (myItem){
      itemList = JSON.parse(myItem); //convert sang JSON
    }
    return itemList;
  }

  //To send ID
  public sendPostID (id: number) {
    console.log('in send post id method',id)
    this.idSource.next(id);  //send: next(): đưa cho currId để mang đi
  }
  //To send cart
  public sendCart (items: Item[]) {
    this.cartSource.next(items);
  }
}
