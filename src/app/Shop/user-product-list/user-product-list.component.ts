import { Component, OnInit, AfterViewInit, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { Product, ProductService } from '../../services/product/product.service';
import { DataService } from '../../services/helper/data.service';
// Pagination
import { PagerService } from '../../services/helper/pager.service';
import * as _ from 'underscore';

@Component({
  selector: 'user-product-list',
  templateUrl: './user-product-list.component.html',
  styleUrls: ['./user-product-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserProductListComponent implements OnInit {
  public brand: string = "Drone Shop";
  public slogan: string = "Đem lại những lựa chọn hoàn hảo!";
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
    // this.productList = this.productSrv.findAll();
    this.initItemList();
  }

  private async initItemList() {
    //initialize to page 1
    this.productList = [];
    let productListPro = await this.productSrv.fetchProduct();
    productListPro.forEach(products => {
      if (products) {
        console.log("products", products);
        products['data'].forEach(p => {
          this.productList.push(new Product(p.danh_muc_id, p.nha_cung_cap_id, p.ten_san_pham, p.mo_ta_chung, p.don_gia,
            p.sale, p.don_vi_ban, p.don_vi_ton_kho, p.diem_danh_gia_tb, p.id));
        });
      }
    });
    console.log("this.productList", this.productList);
    this.dataSrv.setItemLocal("locProductList", this.productList);
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
