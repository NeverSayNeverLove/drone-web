import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Config } from '../services/helper/config';
import {TreeViewComponent} from "@syncfusion/ej2-angular-navigations";
import { enableRipple, createElement } from '@syncfusion/ej2-base';
import { TabComponent} from '@syncfusion/ej2-angular-navigations';

import { CartRow } from '../services/product/cart.service';



@Component({
  selector: 'user-order-history',
  templateUrl: './user-order-history.component.html',
  styleUrls: ['./user-order-history.component.scss']
})

export class UserOrderHistoryComponent implements OnInit {
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
      "icon": "fas fa-search-dollar",
      "navigateUrl": Config.front_endpoint + 'user-order-history', 
    
    },
    
  ];
  
  @ViewChild('element') tabBill: TabComponent;
  public headerText: Object = [{ 'text': 'Chờ Xác Nhận' }, { 'text': 'Đang giao' },{ 'text': 'Đã Nhận Hàng' }];
  
  public cartTable: Array<CartRow> = [
    {
      id: 1,
      name: "Mavic Pro Platinum",
      price: 13000,
      quantity: 1   
    },
    
  ]
  constructor() { }

  ngOnInit() {
    
  }
  // Treeview
  public field: Object = { dataSource: this.treeViewData, id: 'id', text: 'name', iconCss: 'icon' };
  public routing(args){
    let data: any = this.treeview.getTreeData(args.node);
    window.location.href = <string>data[0].navigateUrl;
  }
}
