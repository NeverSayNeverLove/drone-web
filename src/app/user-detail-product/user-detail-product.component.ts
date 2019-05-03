import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product, ProductService } from '../services/product.service';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'user-detail-product',
  templateUrl: './user-detail-product.component.html',
  styleUrls: ['./user-detail-product.component.scss']
})
export class UserDetailProductComponent implements OnInit{
  productList: Product[] = [];
  currProduct: Product;
  productID: number;
  supID: number;
  quantity = 1;

  constructor(
    private dataSrv : DataService,
    private productSrv: ProductService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    //lấy id của product từ param của router
    this.route.params.subscribe(params => {
      this.productID = params['productID'];
    });
    this.getDetailProduct(this.productID);
    this.currProduct['quantityAddToCart'] = 0;
  }


  getDetailProduct(id: number) {
    //lấy productList từ local cache
    this.productList = JSON.parse(JSON.stringify(this.dataSrv.getItemLocal("locProductList")));
    this.currProduct = this.productList.find(p => p.id == this.productID);
  }

  
  minus(){
    if(this.quantity >= 2) this.quantity --;
    console.log(this.quantity);
    return this.quantity;
  }
  add(){
    if(this.quantity < 10) this.quantity ++;
    console.log(this.quantity);
    return this.quantity;
  }
  addToCart(quantity: number) {
    this.currProduct['quantityAddToCart'] += quantity;
  }
}
