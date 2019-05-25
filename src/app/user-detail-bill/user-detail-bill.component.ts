import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Config } from '../services/helper/config';
import {TreeViewComponent} from "@syncfusion/ej2-angular-navigations";
import { CartRow, Item } from '../services/product/cart.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product/product.service';
import { DataService } from '../services/helper/data.service';
import { UserService, User } from '../services/auth/user.service';
import { AuthService } from '../services/auth/auth.service';

// import * as $ from 'jquery';

@Component({
  selector: 'user-detail-bill',
  templateUrl: './user-detail-bill.component.html',
  styleUrls: ['./user-detail-bill.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserDetailBillComponent implements OnInit {
  public brand: string = "Drone Shop";
  public slogan: string = "Đem lại những lựa chọn hoàn hảo!";
  @ViewChild("tree") public treeview: TreeViewComponent;
  private items: Item[] = [];  
  private total: number = 0;

  enableChange = true;
  enableSave = false;
  enableInput = false;
  enableValue = true;
	addressValue: string = "địa chỉ mặc định";
	public currentUser: Object;

  
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
		private dataSrv: DataService,
		private userSrv: UserService,
		private authSrv: AuthService,
  ){}

  ngOnInit() {
		//currentUser
		let key = 'CurrentUser'
		this.currentUser = this.userSrv.getCurrentUser(key);
		console.log("currentUser",this.currentUser);
		this.addressValue = this.currentUser['dia_chi'];
    // this.calculatePriceBill();
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      id = Number(id);
			if (id) {
				let item: Item = {
					product: this.productService.find(id),
					quantity: 1
				};
				if (this.dataSrv.getItem('cart') == null) {
					let cart: any = [];
          cart.push(item);
					this.dataSrv.setItem('cart', JSON.stringify(cart));
				} else {
					let cart: any = this.dataSrv.getItem('cart');
					let index: number = -1;
					for (let i = 0; i < cart.length; i++) {
						let item: Item = JSON.parse(cart[i]);
						if (item.product.id == id) {
							index = i;
							break;
						}
					}
					if (index == -1) {
						cart.push(JSON.stringify(item));
						this.dataSrv.setItem('cart', JSON.stringify(cart));
					} else {
						let item: Item = JSON.parse(cart[index]);
						item.quantity += 1;
						cart[index] = JSON.stringify(item);
						this.dataSrv.setItem("cart", JSON.stringify(cart));
					}
				}
				this.loadCart();
			} else {
				this.loadCart();
			}
		});
	}

  loadCart(): void {
		this.total = 0;
		this.items = [];
    let cart = this.dataSrv.getItem('cart');
    let itemList = JSON.parse(cart);
    itemList.forEach(item => {
      	this.items.push({
      		product: item.product,
      		quantity: item.quantity
      	});
      	this.total += item.product.unitPrice * item.quantity;
    });
  }
  
  remove(id: number): void {
		let cart: any = this.dataSrv.getItem('cart');
		let index: number = -1;
		for (let i = 0; i < cart.length; i++) {
			let item: Item = JSON.parse(cart[i]);
			if (item.product.id == id) {
				cart.splice(i, 1);
				break;
			}
		}
		this.dataSrv.setItem("cart", JSON.stringify(cart));
		this.loadCart();
	}
 
  public changeAddress() {
    this.enableChange = false;
    this.enableSave = true;
    this.enableInput = true;
    this.enableValue = false;
  }

  public saveAddress() {
    this.enableChange = true;
    this.enableSave = false;
    this.enableInput = false;
    this.enableValue = true;
    console.log(this.addressValue);
  }

  


}
