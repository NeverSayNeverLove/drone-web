import { Component, OnInit, AfterViewInit, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { Product, ProductService } from '../../services/product/product.service';
import { DataService } from '../../services/helper/data.service';
import { UserService, User } from '../../services/auth/user.service';
import { FilterproductService } from '../../services/filter/filterproduct.service'
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

  supList: any[];
  fieldsSup: any;
  placeholderSup: string = 'Lựa chọn Nhà cung cấp';
  selectedSup: any;

  priceList: any[];
  fieldsPrice: any;
  placeholderPrice: string = 'Lựa chọn tầm giá';
  selectedPrice: any;

  constructor(
    private productSrv: ProductService,
    private dataSrv: DataService,
    private pagerService: PagerService,
    private userSrv: UserService,
    private filterProSrv: FilterproductService,
  ) { }

  ngOnInit() {
    // this.productList = this.productSrv.findAll();
    this.initItemList();

    this.fieldsSup = { text: 'hoTen', value: 'id' };
    this.priceList = this.dataSrv.priceList;
    this.fieldsPrice = { text: 'price', value: 'id' };
  }

  private initItemList() {
    this.fetchAllSup();
    this.fetchAllProduct();
  }

  private async fetchAllProduct() {
    //initialize to page 1
    this.productList = [];
    let productListPro = await this.productSrv.fetchProduct();
    productListPro.forEach(products => {
      if (products) {
        products['data'].forEach(p => {
          this.productList.push(new Product(p.danh_muc_id, p.nha_cung_cap_id, p.ten_san_pham, p.mo_ta_chung, p.don_gia,
            p.sale, p.don_vi_ban, p.don_vi_ton_kho, p.diem_danh_gia_tb, p.id));
        });
      }
    });
    this.dataSrv.setItem("locProductList", this.productList);
    this.setPage(1);
  }

  // fetch tat ca nha cung cap
  private async fetchAllSup() {
    let supPromise: any;
    this.supList = [];
    let token = this.userSrv.getToken();
    supPromise = await this.userSrv.fetchAllSup(token)
    supPromise.forEach(supList => {
        supList['data'].forEach(sup => {
            this.supList.push({
              id: sup.id,
              hoTen: sup.ho_ten
            });
        });
    });
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
  public filterAll() {
    this.productList = this.dataSrv.getItem('locProductList')
    if (this.selectedSup && this.selectedSup.length) {
        this.productList = this.filterProSrv.filterSup(this.productList, this.selectedSup);
    }
    if (this.selectedPrice && this.selectedPrice.length) {
        this.productList = this.filterProSrv.filterPrice(this.productList, this.selectedPrice);
    }
    this.setPage(1);
  }
}
