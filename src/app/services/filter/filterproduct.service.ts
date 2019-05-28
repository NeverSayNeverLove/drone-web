import { Injectable } from '@angular/core';

import { DataService } from '../helper/data.service';

@Injectable({
  providedIn: 'root'
})
export class FilterproductService {

  constructor(
    private dataSrv: DataService,) { }

  public filterSup(proList, listID): any {
    console.log('listID', listID);
    console.log('before', proList);
    proList = proList.filter(function (e) {
        return this.indexOf(e.supID) >= 0;
    }, listID);
    console.log('after', proList);
    return proList
  }

  public filterPrice(proList, listID): any {
    console.log('list price id', listID);
    // proList = proList.filter(function (e) {
    //     return this.indexOf(e.diaDiemBayID) >= 0;
    // }, listID);
    return proList
  }
}
