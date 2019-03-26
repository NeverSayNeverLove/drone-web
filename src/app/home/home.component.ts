import { Component, OnInit } from '@angular/core';
import { BaivietService } from '../services/baiviet.service';
import { ChuyenmucService } from '../services/chuyenmuc.service';
import { ForumService } from '../services/forum.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private postSrv: BaivietService,
    private chuyenMucSrv: ChuyenmucService,
    private forumSrv: ForumService
    ) { }

  ngOnInit() {
    // let postPromise = this.postSrv.fetchPostByIdNguoiTao(2);
    // let postPromise1 = this.postSrv.fetchPostById(2);
    // let postPromise2 = this.postSrv.fetchPostByIdChuyenMuc(1);
    // let postPromise2 = this.postSrv.fetchPostByListId([3,4,5]);
    //fetch bài viết theo điều kiện
    // let start = new Date("2019-03-18");
    // let end = new Date("2019-03-22");
    // let postPromise2 = this.postSrv.fetchPostByCondition(1,1,true,start, end);
    // let chuyenMucPromise = this.chuyenMucSrv.fetchChuyenMuc();
    // let chuyenMucPromise = this.chuyenMucSrv.fetchChuyenMucById(5);
    // let chudeForumPromise = this.forumSrv.fetchChudeForum();
    // let chudeForumPromise2 = this.forumSrv.fetchChudeForumById(1);
    // let chudeForumPromise3 = this.forumSrv.fetchCauhoiForum();
    // let chudeForumPromise3 = this.forumSrv.fetchCauhoiByChudeId(1);
    // let chudeForumPromise3 = this.forumSrv.fetchCauhoiByNguoidatId(5);
    // let chudeForumPromise3 = this.forumSrv.fetchTraloiById(5);




    
    
  }

}
