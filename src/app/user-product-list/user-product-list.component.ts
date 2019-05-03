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
    this.productList = this.productSrv.findAll();
    console.log(this.productList);
    //initialize to page 1
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
