import { Injectable } from '@angular/core';

import { DataService } from '../helper/data.service';
import { LichTapBay } from '../event/lichtapbay.service';

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
  
  public filterEventsByID(events: Array<any>, ids: Array<number>) : Array<LichTapBay> {
    events = events.filter(function (e) {
      if (e.typeOfEvent == "LichTapBay") {
        return this.indexOf(e.Id) < 0;
      } else {
        return e;
      }
    }, ids);
    return events
  }

  public filterIDsByOtherIDs(IDs: Array<number>, otherIDs: Array<number>): Array<number> {
    IDs = IDs.filter(function (id) {
      return this.indexOf(id) < 0;
    }, otherIDs)
    return IDs;
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
