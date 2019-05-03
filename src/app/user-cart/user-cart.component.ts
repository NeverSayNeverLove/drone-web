import { Component, OnInit } from '@angular/core';
import { CartRow, Item } from '../services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductService } from '../services/product.service';


@Component({
  selector: 'user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.scss']
})
export class UserCartComponent implements OnInit {


  public cartTable: Array<CartRow> = [
    {
      id: 1,
      name: "product 1",
      price: 10,
      quantity: 1
      
    },
    {
      id: 2,
      name: "product 2",
      price: 10,
      quantity: 2
      
    }
  ]
  
 
  totalPriceBill: number = 0;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productSrv: ProductService 
  ) { }

  ngOnInit() {
    this.calculateBill();
  
  }

  calculateBill() {
    this.totalPriceBill = 0;
    this.cartTable.forEach(item => {
      this.totalPriceBill += item.price*item.quantity; 
    })
  }

  minus(id) {
    this.cartTable.forEach(cartrow =>{
      if(cartrow.id === id && cartrow.quantity >= 2){
        cartrow.quantity--;
      }
    });
    this.calculateBill();
  }
  add(id) {
    this.cartTable.forEach(cartrow =>{
      if(cartrow.id === id && cartrow.quantity < 10){
        cartrow.quantity++;
      }
    });
    this.calculateBill();
  }
  remove(id) {    
    this.cartTable = this.cartTable.filter(e => e.id != id);
    this.calculateBill();
  }
}
