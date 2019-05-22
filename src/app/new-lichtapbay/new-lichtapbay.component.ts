import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { DiadiembayService } from '../services/training/diadiembay.service';
import { LichTapBay } from '../services/event/lichtapbay.service';
import { DataService } from '../services/helper/data.service';

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

  public placeList;
  public fieldsPlace: any;

  newLichBay: LichTapBay;

  @Output() createLichbay = new EventEmitter<object>();

  constructor(
    private placeSrv: DiadiembayService,
    private dataSrv: DataService,) { }

  ngOnInit() {
    console.log('on init')
    this.renderLichTapBayTemplate();
  }

  ngOnChanges() {
    console.log('on changes')
    // this.renderLichTapBayTemplate();
  }

  public sendChangedLichBay() {
    this.createLichbay.emit(this.newLichBay);
  }

  private renderLichTapBayTemplate() {
    this.eventStatus = this.dataSrv.statusList[0].name;
    console.log(this.eventStatus)
    this.fieldsPlace = { text: 'diaChi', value: 'id' };
    this.placeList = this.placeSrv.getPlaceList();
    // console.log('this is placeList', this.placeList)
  }
}
