<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { CartRow } from '../services/cart.service';
=======
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService, CartRow } from '../services/product.service';
import { EditSettingsModel, CommandModel, RowSelectEventArgs, SelectionSettingsModel, GridComponent } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
>>>>>>> user-cart test 1

@Component({
  selector: 'user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.scss']
})
export class UserCartComponent implements OnInit {
<<<<<<< HEAD
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
  constructor() { }

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
=======
  public cartList: Array<CartRow>=[
    {
      id: 1,
      quantity: 0,
      productId: 1,
      productName: "Drone",
      price: 15,
      totalPrice: 0
    },
    {
      id: 2,
      quantity: 0,
      productId: 2,
      productName: "Drone 2",
      price: 10,
      totalPrice: 0
    },

  ];
  public data_cartList: Object[];

  //edit table
  public editSettings: EditSettingsModel;
  public commands: CommandModel[];
  //selected row
  public selectionOptions: SelectionSettingsModel;
  @ViewChild('cartGrid') public cartGrid: GridComponent;

  constructor() { }

  ngOnInit() {
    this.data_cartList = this.cartList;
    this.editSettings = { allowEditing: true, allowDeleting: true };
    this.commands = [{ type: 'Edit', buttonOption: { cssClass: 'e-flat', iconCss: 'e-edit e-icons' } },
    { type: 'Delete', buttonOption: { cssClass: 'e-flat', iconCss: 'e-delete e-icons' } },
    { type: 'Save', buttonOption: { cssClass: 'e-flat', iconCss: 'e-update e-icons' } },
    { type: 'Cancel', buttonOption: { cssClass: 'e-flat', iconCss: 'e-cancel-icon e-icons' } }];
    

  }

  
  rowSelected(args: RowSelectEventArgs) {
    // Get the selected records (selected row object).
    let selectedrow = this.cartGrid.getSelectedRecords();
    // console.log(this.cartList);
    // let cart = this.cartList.find(cart => cart.id == selectedrow['0'].id);
    // cart.totalPrice = cart.price*cart.quantity;
    // console.log('cart:', cart);
    // console.log('selected row', selectedrow['0']);
    this.cartList.forEach(cart => {
      if (cart.id == selectedrow['0'].id) {
        console.log(cart.price*cart.quantity);
        cart.totalPrice = cart.price*cart.quantity;
      }
    })
    this.data_cartList = this.cartList;
    console.log('data_cartList:', this.data_cartList);
    this.cartGrid.refresh();
>>>>>>> user-cart test 1
  }
}
