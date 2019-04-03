import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaivietService, Post } from '../services/baiviet.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'user-detail-new',
  templateUrl: './user-detail-new.component.html',
  styleUrls: ['./user-detail-new.component.scss']
})
export class UserDetailNewComponent implements OnInit, OnDestroy {

  postList: Array<Post> = [];
  currPost: Post;
  postID: number;

  constructor(
    private postSrv: BaivietService,
    private dataSrv: DataService) { }

  ngOnInit() {
    this.dataSrv.currPostID.subscribe(id => {console.log(id); this.postID = id});
    this.initData();
  }

  ngOnDestroy() {
  }

  initData() {
    this.getPost();
  }

  getPost() {
    this.postList = JSON.parse(JSON.stringify(this.postSrv.getPost()));
    this.currPost = this.postList.find(p => p.id === this.postID);
    console.log('selected post', this.currPost);
  }

}
