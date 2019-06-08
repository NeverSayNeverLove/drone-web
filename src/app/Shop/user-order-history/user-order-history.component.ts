import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Config } from '../../services/helper/config';
import {TreeViewComponent} from "@syncfusion/ej2-angular-navigations";
import { enableRipple, createElement } from '@syncfusion/ej2-base';
import { TabComponent} from '@syncfusion/ej2-angular-navigations';
import { Item } from '../../services/product/cart.service';

import { CartRow } from '../../services/product/cart.service';
import { DataService } from '../../services/helper/data.service';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper/helper.service';



@Component({
  selector: 'user-order-history',
  templateUrl: './user-order-history.component.html',
  styleUrls: ['./user-order-history.component.scss']
})

export class UserOrderHistoryComponent implements OnInit {
  public brand: string = "Drone Shop";
  public slogan: string = "Đem lại những lựa chọn hoàn hảo!";
  @ViewChild("tree") public treeview: TreeViewComponent;
  private items: Item[] = [];
  private totalPrice: number = 0;
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
  constructor(
    private dataSrv: DataService,
    private router: Router,
    private helper: HelperService
    ) { }

  ngOnInit() {
    this.loadCart();
    
  }

  loadCart() {
		this.totalPrice = 0;
		this.items = [];
    let itemList = this.dataSrv.getItemLocal('cartUser');
    console.log("itemList",itemList);
    this.dataSrv.setItemLocal('cartUser', []);
		if (itemList && itemList.length) {
			itemList.forEach(item => {
        this.items.push(item);
        this.totalPrice += item.product.unitPrice * item.quantity;
      });
      this.items['date'] = this.helper.formatDateTime(new Date());
		} else {
      //Do Some Thing
    } 
  }
    
  // Treeview
  public field: Object = { dataSource: this.treeViewData, id: 'id', text: 'name', iconCss: 'icon' };
  public routing(args){
    let data: any = this.treeview.getTreeData(args.node);
    window.location.href = <string>data[0].navigateUrl;
  }
}
