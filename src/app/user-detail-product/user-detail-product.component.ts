import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-detail-product',
  templateUrl: './user-detail-product.component.html',
  styleUrls: ['./user-detail-product.component.scss']
})
export class UserDetailProductComponent implements OnInit {
  quantity = 1;

  constructor() { }

  ngOnInit() {
  }
  minus(){
    if(this.quantity >= 2) this.quantity --;
    return this.quantity;
  }
  add(){
    if(this.quantity < 10) this.quantity ++;
    return this.quantity;
  }
}
