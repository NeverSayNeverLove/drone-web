import { Injectable } from '@angular/core';
import { Config } from '../helper/config';
import { DataService } from '../helper/data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[];

  constructor(
    private http: HttpClient,
    private dataSrv: DataService,
  ) {
    //Lấy dữ liệu - Khởi tạo mảng
    this.getProduct();
  }

  findAll(): Product[] {
    return this.products;
  }

  find(id: number): Product {
    return this.products[this.getSelectedIndex(id)];
  }

  private getSelectedIndex(id: number) {
    for (var i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        return i;
      }
    }
    return -1;
  }

  //Return Array
  async getProduct() {
    //kiểm tra dữ liệu trên local cache
    this.products = JSON.parse(JSON.stringify(this.dataSrv.getItemLocal("locProductList")));
    //Nếu k có thì fetch dữ liệu từ Server
    if (!this.products || !this.products.length) {
      this.products = [];
      let productPromises: Array<Object> = [];
      productPromises = await this.fetchProduct();
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
          this.products.push(product);
        });
      });
      //lưu lại vào local cache sau khi fetch
      this.dataSrv.setItemLocal("locProductList", this.products);
    }
  }

  // Get From DB - Return Promise
  async fetchProduct() {
    let listPromise: any;
    listPromise = [];
    try {
      let tmp;
      tmp = await new Promise((resolve, reject) => {
        this.http.get(`${Config.api_endpoint_khai}product/page=1&limit=${Config.pageSizeMax}`)// this.http.get()
          .subscribe(data => {                                                                              //.subscribe: khi đã fetch đc dữ liệu
            resolve(data);
          });
      });
      listPromise.push(tmp);

      let total: number = tmp['data']['total'];
      let pageSize: number = 0;
      pageSize = +tmp['data']['pageSize'];
      let pages: number = Math.ceil(total / pageSize);

      for (let page = 2; page <= pages; page++) {
        tmp = await new Promise((resolve, reject) => {
          this.http.get(`${Config.api_endpoint_khai}product/page=${page}&limit=${Config.pageSizeMax}`)
            .subscribe(data => {
              resolve(data);
            });
        });
        listPromise.push(tmp);
      }
    } catch (error) {
      throw error;
    }
    return listPromise;
  }
}

export class Product {
  public categoryID: number;
  public supID: number;
  public name: string;
  public des: string;
  public unitPrice: number;
  public sale: number;
  public sold: number;
  public rest: number;
  public rating: number;
  public id: number;
  constructor( ) { }
}
