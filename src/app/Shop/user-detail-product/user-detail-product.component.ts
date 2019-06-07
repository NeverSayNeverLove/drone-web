import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product, ProductService } from '../../services/product/product.service';
import { DataService } from '../../services/helper/data.service';
import { ActivatedRoute } from "@angular/router";
import { Item, CartService } from '../../services/product/cart.service';

@Component({
  selector: 'user-detail-product',
  templateUrl: './user-detail-product.component.html',
  styleUrls: ['./user-detail-product.component.scss']
})
export class UserDetailProductComponent implements OnInit {
  public brand: string = "Drone Shop";
  public slogan: string = "Đem lại những lựa chọn hoàn hảo!";
  productList: Product[] = [];
  currProduct: Product;
  productID: number;
  supID: number;
  quantity = 1;
  items: Item[] = [];
  totalQuantity: number = 0;
  public split_des: string[] = [];

  constructor(
    private dataSrv: DataService,
    private productSrv: ProductService,
    private route: ActivatedRoute,
    private cartSrv: CartService
  ) { }

  ngOnInit() {
    //lấy id của product từ param của router
    this.route.params.subscribe(params => {
      this.productID = params['productID'];
    });
    this.initData();
  }

  private async initData(){
    await this.fetchProduct(this.productID);

    this.items = this.dataSrv.getItemLocal("cartUser");
    if (!this.items) {
      this.items = [];
      // this.totalQuantity = this.cartSrv.countTotalQuantity(this.items);
      // this.items.push(new Item(this.currProduct, this.totalQuantity));
      // this.dataSrv.setItemLocal("cartUser", this.items);
    } else {
      this.totalQuantity = this.cartSrv.countTotalQuantity(this.items);
    }
  }

  private async fetchProduct(productID) {
    let product = await this.productSrv.fetchProductByID(productID);
    this.currProduct = new Product(product.danh_muc_id, product.nha_cung_cap_id, product.ten_san_pham, product.mo_ta_chung, product.don_gia,
      product.sale, product.don_vi_ban, product.don_vi_ton_kho, product.diem_danh_gia_tb, product.id);
    this.split_des = this.currProduct.des.split(".");
    this.split_des.pop();
  }


  minus() {
    if (this.quantity >= 2) this.quantity--;
    return this.quantity;
  }
  add() {
    if (this.quantity < 10) this.quantity++;
    return this.quantity;
  }


  addToCart() {
    if (!this.items.length) {
      let item: Item = {
        product: this.currProduct,
        quantity: this.quantity
      };
      this.items.push(item);
    } else {
      let existedItem: Item = this.items.find(i => i.product.id == this.currProduct.id);
      if (existedItem == null) {
        let item: Item = {
          product: this.currProduct,
          quantity: this.quantity
        };
        this.items.push(item);
        console.log("thêm vào item chưa có ");
      } else {
        existedItem.quantity = this.quantity;
        
        console.log("thêm vào item đã tồn tại")
      }
      console.log("items else: ", this.items);
    }
    this.dataSrv.setItemLocal("cartUser", this.items);
    this.totalQuantity = this.cartSrv.countTotalQuantity(this.items);
    console.log ("totalQuantity: ",this.totalQuantity);
  }

}
