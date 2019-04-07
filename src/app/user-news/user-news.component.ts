import { Component, OnInit, OnDestroy } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

import { BaivietService, Post } from '../services/baiviet.service';
import { DataService } from '../services/data.service';
// Pagination
import { PagerService } from '../services/pager.service';
import * as _ from 'underscore';


@Component({
  selector: 'user-news',
  templateUrl: './user-news.component.html',
  styleUrls: ['./user-news.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class UserNewsComponent implements OnInit, OnDestroy {

  public postList: Array<Post> = [];

   // pager object
   pager: any = {};
   // paged items
   pagedPostList: any[];


  constructor(
    private postSrv: BaivietService,
    private dataSrv: DataService,
    private pagerService: PagerService) { }

  //ngOnInit: sau khi dữ html load xong
  public ngOnInit(): void {

    this.initData();
  }

  public ngOnDestroy() {
    // this.dataSrv.setItemLocal('detailPostID', );

  }

  async initData() {
    await this.getPost();
  }

  //To get data lên view
  async getPost() {

    //Lấy dữ liệu từ local trước
    this.postList = JSON.parse(JSON.stringify(this.postSrv.getPost("locPostList"))); //deep : tạo 1 bản sao mới - truyền tham trị (kể cả object trong object)
    //Nếu k có thì mới fetch
    if (!this.postList.length) {
      let postPromise = await this.postSrv.fetchPostByIdChuyenMuc(2);   //2: tin tức trong diễn đàn
      postPromise.forEach(posts => {      //posts: mỗi page
        posts.content.forEach(p => {      //posts.content: array<post>
          let post: Post = new Post();
          post.id = p.id;
          post.tieuDe = p.tieuDe;
          post.noiDung = p.noiDung;
          post.tag = p.tag;
          post.trangThai = p.trangThai;
          post.chuyenMucId = p.chuyenMuc.id;
          post.nguoiTaoId = p.nguoiTao.id;
          this.postList.push(post);
        });
      });
      this.postSrv.setPost(this.postList,"locPostList");  //lưu vào local (RAM)
    }
    // initialize to page 1
    this.setPage(1);
    console.log(this.pager);
  }

  sendCurrPostID(id) {
    this.dataSrv.sendPostID(id);
  }// đưa id cho currID (người đưa thư)

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
        return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.postList.length, page);

    // get current page of items
    this.pagedPostList = this.postList.slice(this.pager.startIndex, this.pager.endIndex + 1);
}
}
