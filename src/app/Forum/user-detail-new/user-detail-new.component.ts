import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaivietService, Post } from '../../services/forum/baiviet.service';
import { DataService } from '../../services/helper/data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'user-detail-new',
  templateUrl: './user-detail-new.component.html',
  styleUrls: ['./user-detail-new.component.scss']
})
export class UserDetailNewComponent implements OnInit, OnDestroy {
  public brand: string = "Drone News";
  public slogan: string = "Những thông tin mới nhất về Drone";
  postList: Array<Post> = [];
  currPost: Post;
  postID: number;

  constructor(
    private postSrv: BaivietService,
    private dataSrv: DataService,
    private router: Router) { }

  ngOnInit() {
    this.dataSrv.currID.subscribe(id => { console.log(id); this.postID = id });//currID nhận id khi click, rồi chuyển cho postID

    this.initData();
    this.dataSrv.currID.subscribe(id => this.postID = id);
  }

  ngOnDestroy() {
    this.dataSrv.setItem('detailPostID', this.postID);
  }

  //To get data lên view
  initData() {
    this.getPost();
  }

  async getPost() {
    // Lay postID tu Ram hoac localCache
    this.postID = this.postID ? this.postID : this.dataSrv.getItem('detailPostID');
    if (this.postID) { // Neu co postID
      this.postList = JSON.parse(JSON.stringify(this.postSrv.getPost("locPostList"))); // deep copy postList from loc
      if (this.postList.length){  // new trong Ram da co, thi tim currPost
        this.currPost = this.postList.find(p => p.id == this.postID);
      } else { // new trong Ram chua co -> refetch from server
        let postPromise = await this.postSrv.fetchPostByIdChuyenMuc(2);
        postPromise.forEach(posts => {
          posts.content.forEach(p => {
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
        this.postSrv.setPost(this.postList,"locPostList"); // save postList to loc (Ram)
        this.currPost = this.postList.find(p => p.id == this.postID); // find currPost
      }
      this.dataSrv.setItem('detailPostID', this.postID); // save currID to localStorage
    } else {  // Neu khong co postID se chuyen ve user-news
      this.router.navigateByUrl('/user-news');
    }
  }

}
