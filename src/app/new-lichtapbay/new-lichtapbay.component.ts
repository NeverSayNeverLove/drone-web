import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { DiadiembayService } from '../services/training/diadiembay.service';
import { LichTapBay } from '../services/event/lichtapbay.service';
import { DataService } from '../services/helper/data.service';
import { UserService, User } from '../services/auth/user.service';
import { DronedaotaoService, DroneDaoTao } from '../services/training/dronedaotao.service';

@Component({
  selector: 'new-lichtapbay',
  templateUrl: './new-lichtapbay.component.html',
  styleUrls: ['./new-lichtapbay.component.sass']
})
export class NewLichtapbayComponent implements OnInit {

  public eventDescription: string;
  public eventStartTime: Date;
  public eventEndTime: Date;
  public eventStatus: string;
  public eventPlace: number;
  public eventTitle: string;
  public eventSup: number;
  public eventDrone: number;

  public fieldsSup: any;
  public supList;

  public placeList;
  public fieldsPlace: any;

  public fieldsDrone: any;
  public droneList;

  newLichBay: LichTapBay;

  // @Output() createLichbay = new EventEmitter<object>();

  constructor(
    private placeSrv: DiadiembayService,
    private dataSrv: DataService,
    private userSrv: UserService,
    private droneSrv: DronedaotaoService,) { }

  ngOnInit() {
    this.renderLichTapBayTemplate();
  }

  private renderLichTapBayTemplate() {
    this.placeList = [];
    this.droneList = []
    this.eventStatus = this.dataSrv.statusList[0].name;
    this.fieldsSup = { text: 'hoTen', value: 'id' };
    this.supList = this.userSrv.getSupList();

    this.fieldsPlace = { text: 'diaChi', value: 'id' };
    this.fieldsDrone = { text: 'tenDrone', value: 'id' };
  }

  public onSelectedSup(event) {
    this.placeList = [];
    this.placeList = this.placeSrv.getPlaceListByIDNCC(event);
    this.droneList = []
    this.droneList = this.droneSrv.getDroneListByIDNCC(event);
  }
}
