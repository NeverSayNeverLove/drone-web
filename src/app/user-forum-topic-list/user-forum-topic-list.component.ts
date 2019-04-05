import { Component, OnInit } from '@angular/core';
import { fakeDataArr } from './datasource';
import {PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import {FilterSettingsModel } from '@syncfusion/ej2-angular-grids';


@Component({
  selector: 'user-forum-topic-list',
  templateUrl: './user-forum-topic-list.component.html',
  styleUrls: ['./user-forum-topic-list.component.scss']
})
export class UserForumTopicListComponent implements OnInit {
  public data: Object[];
  public pageSettings: PageSettingsModel;
  public filterSettings: FilterSettingsModel;
  constructor() { }

  ngOnInit() {
    this.data = fakeDataArr;
    this.pageSettings = { pageSize:4 };
    this.filterSettings = { type:'CheckBox'};
  }

}
