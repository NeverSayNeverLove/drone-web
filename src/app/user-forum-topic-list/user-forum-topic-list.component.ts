import { Component, OnInit, ViewChild, AfterViewInit, OnChanges } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {Router} from '@angular/router';

import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { FilterSettingsModel } from '@syncfusion/ej2-angular-grids';

import { SelectionSettingsModel, RowSelectEventArgs,  GridComponent } from '@syncfusion/ej2-angular-grids';
import { ForumService, TopicTableRow } from '../services/forum/forum.service';
import { DataService } from '../services/helper/data.service';
import { BaivietService} from '../services/forum/baiviet.service';
import { UserForumShareComponent} from '../user-forum-share/user-forum-share.component';


@Component({
  selector: 'user-forum-topic-list',
  templateUrl: './user-forum-topic-list.component.html',
  styleUrls: ['./user-forum-topic-list.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class UserForumTopicListComponent implements OnInit, OnChanges{
  public topicList: Array<TopicTableRow> = [];
  public data_topicsList: Object[];

  //grid service
  public pageSettings: PageSettingsModel;
  public filterSettings: FilterSettingsModel;
  public selectionOptions: SelectionSettingsModel;


  @ViewChild('grid1')
  public grid: GridComponent;
  @ViewChild(UserForumShareComponent) forumChild;

  constructor(
    private forumSrv: ForumService,
    private dataSrv: DataService,
    private baivietSrv: BaivietService,
    private router: Router,
  ) { }

  ngOnInit() {

    this.pageSettings = { pageSize: 4 };
    this.filterSettings = { type: 'CheckBox' };
    this.selectionOptions = { type: 'Single' };
    
    this.topicList = this.forumChild.topicList;
    this.data_topicsList = this.topicList;

    this.initData();
  }
  ngOnChanges(){
    console.log ('forumChild topicList:', this.forumChild.topicList);
    this.topicList = this.forumChild.topicList;
    this.data_topicsList = this.topicList;
    this.initData();
    // this.grid.refresh();
    
  }

  add() {
    this.grid.refresh();
  }
  
  receiveMessage($event) {
    this.topicList = $event;
  }

  async initData() {
    await this.getTopic();
    this.data_topicsList = this.topicList;
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
