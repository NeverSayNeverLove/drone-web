import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {Router} from '@angular/router';

import { PageSettingsModel, getPosition } from '@syncfusion/ej2-angular-grids';
import { FilterSettingsModel } from '@syncfusion/ej2-angular-grids';

import { SelectionSettingsModel, RowSelectEventArgs,  GridComponent } from '@syncfusion/ej2-angular-grids';
import { ForumService, ChuDeForum, CauHoiForum, TraLoiForum } from '../../services/forum/forum.service';
import { DataService } from '../../services/helper/data.service';
import { BaivietService} from '../../services/forum/baiviet.service';


@Component({
  selector: 'user-forum-posts-of-topic',
  templateUrl: './user-forum-posts-of-topic.component.html',
  styleUrls: ['./user-forum-posts-of-topic.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserForumPostsOfTopicComponent implements OnInit {
  public brand: string = "Drone News";
  public slogan: string = "Những thông tin mới nhất về Drone";
  public data1: Object[];
  public postList: Array<CauHoiForum>=[];//Khai báo mà không khởi tạo mảng rỗng thì LIỆU HỒN :v
  
  public topicID: number = 0;

  public pageSettings1: PageSettingsModel;
  public filterSettings1: FilterSettingsModel;
  public selectionOptions: SelectionSettingsModel;

  @ViewChild('grid2')
  public grid: GridComponent;

  constructor(
    private dataSrv: DataService,
    private forumSrv: ForumService,
    private baivietSrv: BaivietService,
    private router: Router

  ) { }

  ngOnInit() {
    this.dataSrv.currID.subscribe(id => this.topicID = id);
    this.pageSettings1 = { pageSize:4 };
    this.filterSettings1 = { type:'CheckBox'};
    this.selectionOptions = { type: 'Single' };


    this.initData();
  }
  async initData() {
    await this.getPost();
    this.data1 = this.postList;
  }
  async getPost() {
    // let topicPromise = await this.forumSrv.fetchChudeForum();
    let postPromise = await this.forumSrv.fetchCauhoiByChudeId(this.topicID);
       postPromise.forEach(postPage =>{
         postPage.content.forEach(post =>{
            let postTr = new CauHoiForum();
            postTr.id = post.id;
            postTr.tieuDe = post.tieuDe;
            postTr.noiDung = post.noiDung;
            postTr.nguoiDatId = post.nguoiDat.id;                        
            postTr.chuDeId = post.chuDe.id;
            postTr['nguoiDat'] = post.nguoiDat.hoTen;
            postTr['ngayDat'] = post.ngayDat;
            postTr['numOfAns'] = 0;
            this.postList.push(postTr);
            // let answerPromise =  await this.forumSrv.fetchTraloiByCauhoiId(post.id);
            // console.log('1 answer promise ',answerPromise);
            // postTr['numOfAns'] = answerPromise
            
         });
       }); 
    this.baivietSrv.setPost(this.postList,"locPostList");
  }

  rowSelected(args: RowSelectEventArgs) {
    // Get the selected records (selected row object).
    let selectedrow = this.grid.getSelectedRecords();
    this.dataSrv.setItem('currPost', selectedrow); // save currID to localStorage
    let id = selectedrow[0]['id'];
    this.dataSrv.sendPostID(id);
    this.router.navigateByUrl('/user-forum-detail-post');
    
  }
}
