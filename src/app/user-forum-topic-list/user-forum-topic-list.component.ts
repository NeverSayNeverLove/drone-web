import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {Router} from '@angular/router';

import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { FilterSettingsModel } from '@syncfusion/ej2-angular-grids';

import { SelectionSettingsModel, RowSelectEventArgs,  GridComponent } from '@syncfusion/ej2-angular-grids';
import { ForumService, ChuDeForum, CauHoiForum } from '../services/forum.service';
import { DataService } from '../services/data.service';
import { BaivietService} from '../services/baiviet.service';




@Component({
  selector: 'user-forum-topic-list',
  templateUrl: './user-forum-topic-list.component.html',
  styleUrls: ['./user-forum-topic-list.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class UserForumTopicListComponent implements OnInit {
  public topicList: Array<TopicTableRow> = [];
  public data: Object[];

  //grid service
  public pageSettings: PageSettingsModel;
  public filterSettings: FilterSettingsModel;
  public selectionOptions: SelectionSettingsModel;

  @ViewChild('grid1')
  public grid: GridComponent;

  constructor(
    private forumSrv: ForumService,
    private dataSrv: DataService,
    private baivietSrv: BaivietService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.data = fakeDataArr;
    this.pageSettings = { pageSize: 4 };
    this.filterSettings = { type: 'CheckBox' };
    this.selectionOptions = { type: 'Single' };

    this.initData();
  }

  async initData() {
    await this.getTopic();
    this.data = this.topicList;
  }

  async getTopic() {
    let topicPromise = await this.forumSrv.fetchChudeForum();
    let postPromise = await this.forumSrv.fetchCauhoiForum();
    console.log('postPromise',postPromise);
    topicPromise.forEach(t => {      
      let topicTr: TopicTableRow = new TopicTableRow();
      topicTr.id = t.id;
      topicTr.tenChuDeCauHoi = t.tenChuDeCauHoi;
      this.topicList.push(topicTr);
    });
    this.topicList.forEach(t => {
       postPromise.forEach(postPage =>{
         postPage.content.forEach(post =>{
            if(post.chuDe.id === t.id){
              t.numOfPost ++;
            }
         });
       }); 
    });
    console.log('topicList',this.topicList);
    this.baivietSrv.setPost(this.topicList,"locPostList"); 
  } 

  rowSelected(args: RowSelectEventArgs) {
    // Get the selected records (selected row object).
    let selectedrow = this.grid.getSelectedRecords();  
    let id = selectedrow[0]['id'];
    this.dataSrv.sendPostID(id);
    this.router.navigateByUrl('/user-forum-posts-of-topic');
  }
}
export class TopicTableRow{
  constructor(
    public id: number = 0,
    public tenChuDeCauHoi: string = "",
    public numOfPost: number = 0
  ) { }
}
