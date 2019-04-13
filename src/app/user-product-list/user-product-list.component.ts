import { Component, OnInit, AfterViewInit, ViewEncapsulation, Inject,ViewChild } from '@angular/core';
import { compile, detach } from '@syncfusion/ej2-base';
// import { cardBook } from './../../../../src/app/card/data-source';
import { MultiSelect, SelectEventArgs, RemoveEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query, DataManager, Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'user-product-list',
  templateUrl: './user-product-list.component.html',
  styleUrls: ['./user-product-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserProductListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
