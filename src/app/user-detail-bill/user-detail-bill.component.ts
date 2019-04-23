import { Component, OnInit, ViewChild, Inject, ViewEncapsulation } from '@angular/core';
import { Config } from '../services/config';
import {TreeViewComponent} from "@syncfusion/ej2-angular-navigations";
import { CartRow } from '../services/cart.service';



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
      "icon": "far fa-money-bill-alt",
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

  // Treeview
  public field: Object = { dataSource: this.treeViewData, id: 'id', text: 'name', iconCss: 'icon' };
  public routing(args){
    let data: any = this.treeview.getTreeData(args.node);
     window.location.href = <string>data[0].navigateUrl;
}

}
