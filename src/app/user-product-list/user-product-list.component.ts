import { Component, OnInit, AfterViewInit, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { Product, ProductService } from '../services/product.service';
import { DataService } from '../services/data.service';
// Pagination
import { PagerService } from '../services/pager.service';
import * as _ from 'underscore';

@Component({
  selector: 'user-product-list',
  templateUrl: './user-product-list.component.html',
  styleUrls: ['./user-product-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserProductListComponent implements OnInit {
  public productList: Product[] = [];

  // pager object
  pager: any = {};
  // paged items
  pagedProductList: any[];

  constructor(
    private productSrv: ProductService,
    private dataSrv: DataService,
    private pagerService: PagerService
  ) { }

  ngOnInit() {
    this.getProduct();
  }

  async getProduct() {
    //kiểm tra dữ liệu trên local cache
    this.productList = JSON.parse(JSON.stringify(this.dataSrv.getItemLocal("locProductList")));
    //Nếu k có thì fetch dữ liệu từ Server
    if (!this.productList.length) {
      let productPromises: Array<Object> = [];
      productPromises = await this.productSrv.fetchProduct();
      productPromises.forEach(element => {
        element['data']['data'].forEach(p => {
          let product = new Product();
          product.id = p.id;
          product.supID = p.nha_cung_cap_id;
          product.categoryID = p.danh_muc_id;
          product.name = p.ten_san_pham;
          product.des = p.mo_ta_chung;
          product.rating = p.diem_danh_gia_tb;
          product.rest = p.don_vi_ton_kho;
          product.sale = p.sale;
          product.sold = p.don_vi_ban;
          product.unitPrice = p.don_gia;
          this.productList.push(product);
        });
      });
      //lưu lại vào local cache sau khi fetch
      this.dataSrv.setItemLocal("locProductList", this.productList);
    }
    // initialize to page 1
    this.setPage(1);

  }
  
  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(this.productList.length, page);

    // get current page of items
    this.pagedProductList = this.productList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

}
