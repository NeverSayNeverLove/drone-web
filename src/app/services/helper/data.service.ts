import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../product/cart.service';

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
    
  public statusList: any[] = [
    {id: 1, name: "Đang chờ", eName: "waiting"},
    {id: 2, name: "Đã chấp nhận", eName: "accepted"},
    {id: 3, name: "Đang diễn ra", eName: "started"},
    {id: 4, name: "Đã hủy", eName: "cancelled"},
    {id: 5, name: "Kết thúc", eName: "ended"},
  ];
    
  public statusIssueList: any[] = [
    {id: 1, name: "Dự định", eName: "planned"},
    {id: 2, name: "Đang diễn ra", eName: "started"},
    {id: 3, name: "Kết thúc", eName: "ended"},
  ];

  public roleUserList: any[] = [
    {id: 1, tenVaiTro: "Nhà cung cấp"},
    {id: 2, tenVaiTro: "Admin"},
    {id: 3, tenVaiTro: "Khách hàng"}
  ]

  public priceList: any[] = [
    {id: 1, price: 'nhỏ hơn 100,000'},
    {id: 2, price: '100,000 - 300,000'},
    {id: 3, price: '300,000 - 500,000'},
    {id: 4, price: '500,000 - 1,000,000'},
    {id: 4, price: 'lớn hơn 1,000,000'}
  ]
  
  public storage: Map<string, any> = new Map();

  public setItem(key: string, data: any) {
    this.storage.set(key, JSON.stringify(data));
  }

  public getItem(key: string) {
    let Item: any = null;
    let myItem: any;
    myItem = this.storage.get(key);
    if (myItem) {
      Item = JSON.parse(myItem);
      //trả về JSON
    }
    return Item;
  }


  //local cache
  public setItemLocal(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public getItemLocal(key: string): any {
    let itemList: any = null;
    let myItem: any;
    myItem = localStorage.getItem(key); // trả về string
    if (myItem){
      itemList = JSON.parse(myItem); //convert sang JSON
    }
    return itemList;
  }

  public removeItemLocal(key: string) {
    localStorage.removeItem(key);
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
