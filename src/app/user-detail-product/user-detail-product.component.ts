import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product, ProductService } from '../services/product/product.service';
import { DataService } from '../services/helper/data.service';
import { ActivatedRoute } from "@angular/router";
import { Item, CartService } from '../services/product/cart.service';

@Component({
  selector: 'user-detail-product',
  templateUrl: './user-detail-product.component.html',
  styleUrls: ['./user-detail-product.component.scss']
})
export class UserDetailProductComponent implements OnInit {
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
    console.log("Id nhận: ",this.productID);
    this.initData();


  }

  async initData(){
    await this.getDetailProduct(this.productID);
    console.log("this.currProduct",this.currProduct);
    console.log("items hiện tại: ", this.items);

    this.items = await this.dataSrv.getItemLocal("cartThuy");
    console.log("items hiện tại: ", this.items);
    this.totalQuantity = this.cartSrv.countTotalQuantity(this.items);
    console.log ("totalQuantity: ",this.totalQuantity);
  }

  async getDetailProduct(id: number) {
    //lấy productList từ local cache
    this.productList = await JSON.parse(JSON.stringify(this.dataSrv.getItemLocal("locProductList")));
    console.log("this.productList",this.productList);
    this.currProduct = await this.productList.find(p => p.id == this.productID);
    console.log("this.currProduct",this.currProduct);
    this.split_des = this.currProduct.des.split(".");
    this.split_des.pop();
    console.log("split_des",this.split_des);

  }

  minus() {
    if (this.quantity >= 2) this.quantity--;
    console.log(this.quantity);
    return this.quantity;
  }
  add() {
    if (this.quantity < 10) this.quantity++;
    console.log(this.quantity);
    return this.quantity;
  }


  addToCart() {
    if (!this.items.length) {
      let item: Item = {
        product: this.currProduct,
        quantity: this.quantity
      };
      this.items.push(item);
      console.log("thêm vào mảng rỗng ", this.items);
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
    this.dataSrv.setItemLocal("cartThuy", this.items);
    this.totalQuantity = this.cartSrv.countTotalQuantity(this.items);
    console.log ("totalQuantity: ",this.totalQuantity);
    

  }

}
