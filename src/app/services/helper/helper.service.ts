import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  public formatDateTime(dateTime): string {
      if (dateTime) {
          return moment(dateTime).format("YYYY-MM-DD HH:mm:ss");
      }
      return null;
  }
}
