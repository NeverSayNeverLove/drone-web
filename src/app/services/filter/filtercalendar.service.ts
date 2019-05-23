import { Injectable } from '@angular/core';

import { DataService } from '../helper/data.service';

@Injectable({
  providedIn: 'root'
})
export class FiltercalendarService {

  constructor(
    private dataSrv: DataService,) { }
  
  public filterDrone(events, listID): any {
    events = events.filter(function (e) {
      if (e.typeOfEvent == "LichTapBay") {
        return this.indexOf(e.droneDaoTaoID) >= 0;
      } else {
        return e;
      }
    }, listID);
    return events
  }

  public filterPlace(events, listID): any {
    events = events.filter(function (e) {
      if (e.typeOfEvent == "LichTapBay") {
        return this.indexOf(e.diaDiemBayID) >= 0;
      } else {
        return e;
      }
    }, listID);
    return events
  }

  public filterStatusLichBay(events, listID): any {
    let statusNames = listID.map(id => {
      return this.getStatusLichBay(id);
    })
    events = events.filter(function (e) {
      if (e.typeOfEvent == "LichTapBay") {
        return this.indexOf(e.status) >= 0;
      } else {
        return e;
      }
    }, statusNames);
    return events
  }

  public getStatusLichBay(id): number {
    switch (id) {
      case this.dataSrv.statusList[0].id:
        return this.dataSrv.statusList[0].name;
      case this.dataSrv.statusList[1].id:
        return this.dataSrv.statusList[1].name;
      case this.dataSrv.statusList[2].id:
        return this.dataSrv.statusList[2].name;
      case this.dataSrv.statusList[3].id:
        return this.dataSrv.statusList[3].name;
      case this.dataSrv.statusList[4].id:
        return this.dataSrv.statusList[4].name;
      default:
        break;
    }
  }
}
