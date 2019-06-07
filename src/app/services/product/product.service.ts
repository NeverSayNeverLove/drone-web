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
      listPromise.push(tmp['data']);

      let total: number = tmp['data']['total'];
      let pageSize: number = 0;
      pageSize = +tmp['data']['pageSize'];
      let pages: number = Math.ceil(total / pageSize);

      for (let page = 2; page <= Config.pages; page++) {
        tmp = await new Promise((resolve, reject) => {
          this.http.get(`${Config.api_endpoint_khai}product/page=${page}&limit=${Config.pageSizeMax}`)
            .subscribe(data => {
              resolve(data);
            });
        });
        listPromise.push(tmp['data']);
      }
    } catch (error) {
      throw error;
    }
    return listPromise;
  }

  async fetchProductByID(id) {
    let listPromise: any;
    try {
      listPromise = await new Promise((resolve, reject) => {
        this.http.get(`${Config.api_endpoint_khai}product=${id}`)
          .subscribe(data => {
            resolve(data);
          });
      });
    } catch (error){
      throw error;
    }
    return listPromise['data'];
  }
}

export class Product {
  // public categoryID: number;
  // public supID: number;
  // public name: string;
  // public des: string;
  // public unitPrice: number;
  // public sale: number;
  // public sold: number;
  // public rest: number;
  // public rating: number;
  // public id: number;
  constructor(
    public categoryID: number,
    public supID: number,
    public name: string,
    public des: string,
    public unitPrice: number,
    public sale: number,
    public sold: number,
    public rest: number,
    public rating: number,
    public id: number) { }
}
