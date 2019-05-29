import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { DataService } from '../../services/helper/data.service';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(
    private dataSrv: DataService,) { }

  public formatDateTime(dateTime): string {
      if (dateTime) {
          return moment(dateTime).format("YYYY-MM-DD HH:mm:ss");
      }
      return null;
  }

  public getRoleIDByName(name: string): number {
    return this.dataSrv.roleUserList.find(r => r.tenVaiTro == name).id;
  }
}
