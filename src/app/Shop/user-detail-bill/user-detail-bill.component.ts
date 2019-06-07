import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import {TreeViewComponent} from "@syncfusion/ej2-angular-navigations";
import { Item } from '../../services/product/cart.service';
import { DataService } from '../../services/helper/data.service';
import { UserService } from '../../services/auth/user.service';
import { AuthService } from '../../services/auth/auth.service';
import { CartService } from '../../services/product/cart.service';

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
	totalQuantity: number = 0;
	
	constructor(
		private dataSrv: DataService,
		private userSrv: UserService,
		private authSrv: AuthService,
		private router: Router,
		private cartSrv: CartService 
	){}

	ngOnInit() {
		if (!this.authSrv.loggedIn) { // neu chua login
			let key = 'PriorUrl'
			this.dataSrv.setItem(key, '/user-calendar') // Luu url lai de sau khi login se nhay vao trang nay
			this.router.navigateByUrl('/signin'); // chuyen sang trang login
			return;
		}
		//currentUser
		let key = 'CurrentUser'
		this.currentUser = this.userSrv.getCurrentUser(key);
		this.addressValue = this.currentUser['dia_chi'];
		this.loadCart();
		}

	async loadCart() {
		this.total = 0;
		this.items = [];
		let itemList = this.dataSrv.getItemLocal('cartUser');
		if (itemList && itemList.length) {
			this.totalQuantity = this.cartSrv.countTotalQuantity(itemList);
			itemList.forEach(item => {
				this.items.push(item);
				this.total += item.product.unitPrice * item.quantity;
			});
		} else {
			this.router.navigateByUrl('/user-product-list'); // chuyen sang trang san pham
		}
		// this.activatedRoute.params.subscribe(async params => {
		// 	let id = params['id'];
		// 	id = Number(id);
		// 	if (id) {
		// 		let product = await this.productSrv.fetchProductByID(id);
		// 		let currProduct = new Product(product.danh_muc_id, product.nha_cung_cap_id, product.ten_san_pham, product.mo_ta_chung, product.don_gia,
		// 		product.sale, product.don_vi_ban, product.don_vi_ton_kho, product.diem_danh_gia_tb, product.id);
		// 		let item: Item = {
		// 			product: currProduct,
		// 			quantity: 1
		// 		};
		// 		let cart: any = this.dataSrv.getItem('cart');
		// 		if (cart == null) {
		// 			let cart = [];
		// 			cart.push(item);
		// 			this.dataSrv.setItem('cart', cart);
		// 		} else {
		// 			let index: number = -1;
		// 			for (let i = 0; i < cart.length; i++) {
		// 				let item: Item = cart[i];
		// 				if (item.product.id == id) {
		// 					index = i;
		// 					break;
		// 				}
		// 			}
		// 			if (index == -1) {
		// 				cart.push(item);
		// 				this.dataSrv.setItem('cart', cart);
		// 			} else {
		// 				let item: Item = cart[index];
		// 				item.quantity += 1;
		// 				cart[index] = item;
		// 				this.dataSrv.setItem("cart", cart);
		// 			}
		// 		}
		// 	}
		// });
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
