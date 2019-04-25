import { Component, OnInit, ViewChild, Inject, ViewEncapsulation } from '@angular/core';
import { Config } from '../services/config';
import {TreeViewComponent} from "@syncfusion/ej2-angular-navigations";
import { CartRow } from '../services/cart.service';
import * as $ from 'jquery';

@Component({
  selector: 'user-detail-bill',
  templateUrl: './user-detail-bill.component.html',
  styleUrls: ['./user-detail-bill.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserDetailBillComponent implements OnInit {
  @ViewChild("tree") public treeview: TreeViewComponent;

  public treeViewData: Object[] = [
    {
      "id": '01', 
      "name": 'Thông tin tài khoản', 
      "icon": "fas fa-address-book",
      "navigateUrl": Config.front_endpoint,
    },
    {
      "id": '02', 
      "name": ' Lịch sử đơn hàng',
      "icon": "fas fa-file-invoice-dollar",
      "navigateUrl": Config.front_endpoint + 'user-cart', 
    
    },
    
  ];

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
  enableChange = true;
  enableSave = false;
  enableInput = false;
  enableValue = true;
  addressValue: string = "địa chỉ mặc định";
 
  constructor(){}

  ngOnInit() {
    this.calculatePriceBill();
  }
  
  public totalPriceBill: number = 0;
  public calculatePriceBill() {
    this.cartTable.forEach(row =>{
      this.totalPriceBill += row.price*row.quantity;
    })
  } 

  public changeAddress() {
    // $("input").prop('disabled', false);
    this.enableChange = false;
    this.enableSave = true;
    this.enableInput = true;
    this.enableValue = false;
  }

  public saveAddress() {
    // $("input").prop('disabled', true);
    this.enableChange = true;
    this.enableSave = false;
    this.enableInput = false;
    this.enableValue = true;
    console.log(this.addressValue);
  }

  // Treeview
  public field: Object = { dataSource: this.treeViewData, id: 'id', text: 'name', iconCss: 'icon' };
  public routing(args){
    let data: any = this.treeview.getTreeData(args.node);
     window.location.href = <string>data[0].navigateUrl;
}

}
