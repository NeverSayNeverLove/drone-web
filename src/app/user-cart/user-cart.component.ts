import { Component, OnInit } from '@angular/core';
import { Item, CartService } from '../services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductService } from '../services/product.service';
import { DataService } from '../services/data.service';


@Component({
  selector: 'user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.scss']
})
export class UserCartComponent implements OnInit {
  items: Item[] = [];
  totalPriceBill: number = 0;
  totalQuantity: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productSrv: ProductService,
    private dataSrv: DataService,
    private cartSrv: CartService 
  ) { }

  ngOnInit() {
    this.items = this.dataSrv.getItemLocal("cartThuy");
    this.totalQuantity = this.cartSrv.countTotalQuantity(this.items);
    this.calculateBill();
  
  }

  calculateBill() {
    this.totalPriceBill = 0;
    this.items.forEach(item => {
      this.totalPriceBill += item.product.unitPrice*item.quantity; 
    })
  }

  minus(id: number) {
    this.items.forEach(item =>{
      if(item.product.id === id && item.quantity >= 2){
        item.quantity--;
      }
    });
    this.dataSrv.setItemLocal("cartThuy",this.items);
    this.totalQuantity = this.cartSrv.countTotalQuantity(this.items);
    this.calculateBill();
  }

  add(id: number) {
    this.items.forEach(item =>{
      if(item.product.id === id && item.quantity < 10){
        item.quantity++;
      }
    });
    this.dataSrv.setItemLocal("cartThuy",this.items);
    this.totalQuantity = this.cartSrv.countTotalQuantity(this.items);
    this.calculateBill();
  }
  
  remove(id: number) {    
    this.items = this.items.filter(e => e.product.id != id);
    this.totalQuantity = this.cartSrv.countTotalQuantity(this.items);
    this.calculateBill();
  }
}
