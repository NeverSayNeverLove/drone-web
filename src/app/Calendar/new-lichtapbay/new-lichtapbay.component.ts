import { Component, OnInit, ViewChild } from '@angular/core';

import { DiadiembayService } from '../../services/training/diadiembay.service';
import { LichTapBay } from '../../services/event/lichtapbay.service';
import { DataService } from '../../services/helper/data.service';
import { UserService, User } from '../../services/auth/user.service';
import { DronedaotaoService, DroneDaoTao } from '../../services/training/dronedaotao.service';

import { DateTimePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { FormValidator, FormValidatorModel } from '@syncfusion/ej2-inputs';

@Component({
  selector: 'new-lichtapbay',
  templateUrl: './new-lichtapbay.component.html',
  styleUrls: ['./new-lichtapbay.component.scss']
})
export class NewLichtapbayComponent implements OnInit {

  // @ViewChild('formElement') element: any;
  // @ViewChild('StartTime') ejDateTime: DateTimePickerComponent;
  // public formObject: FormValidator;
  // @ViewChild('formElement') element: any;
  // @ViewChild('StartTime') ejDateTime: DateTimePickerComponent;
  // public formObject: FormValidator;

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
    
        // custom validator function.
      //   let customFn: (args: {
      //     [key: string]: string
      // }) => boolean = (args: {
      //     [key: string]: string
      // }) => {
      //     return ((this.ejDateTime.value).getFullYear() > 1990 && (this.ejDateTime.value).getFullYear() < 2020);
      // };
      // let options: FormValidatorModel = {
      //     rules: {
      //         'StartDateTime': {
      //             required: [true, "Value is required"]
      //         }
      //     },
      //     customPlacement: (inputElement: HTMLElement, errorElement: HTMLElement) => {
      //         inputElement.parentElement.parentElement.appendChild(errorElement);
      //     }
      // };
      // this.formObject = new FormValidator('#form-element', options);
      // this.formObject.addRules('StartDateTime', {
      //     range: [customFn, "Please select a date between years from 1990 to 2020"]
      // });
      // this.formObject = new FormValidator('#form-element', options);
  }

  public onSelectedSup(event) {
    this.placeList = [];
    this.placeList = this.placeSrv.getPlaceListByIDNCC(event);
    this.droneList = []
    this.droneList = this.droneSrv.getDroneListByIDNCC(event);
  }
  
  // Form validation takes place when focus() event of datetimepicker is triggered.
  // public onFocusOut(): void {
  //   this.formObject.validate("StartDateTime");
  // }
  // // Custom validation takes place when value is changed.
  // public onChange(args: any) {
  //     if (this.ejDateTime.value != null)
  //         this.formObject.validate("StartDateTime");
  // }
}
