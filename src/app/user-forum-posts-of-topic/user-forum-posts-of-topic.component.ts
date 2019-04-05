import { Component, OnInit } from '@angular/core';
import { fakeDataArr1 } from './datasource1';
import {PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import {FilterSettingsModel } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'user-forum-posts-of-topic',
  templateUrl: './user-forum-posts-of-topic.component.html',
  styleUrls: ['./user-forum-posts-of-topic.component.scss']
})
export class UserForumPostsOfTopicComponent implements OnInit {
  public data1: Object[];
  public pageSettings1: PageSettingsModel;
  public filterSettings1: FilterSettingsModel;
  constructor() { }

  ngOnInit() {
    this.data1 = fakeDataArr1;
    this.pageSettings1 = { pageSize:4 };
    this.filterSettings1 = { type:'CheckBox'};
  }

}
