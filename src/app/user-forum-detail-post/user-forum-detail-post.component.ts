import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';


import { ForumService, ChuDeForum, CauHoiForum, TraLoiForum } from '../services/forum.service';
import { DataService } from '../services/data.service';
import { BaivietService } from '../services/baiviet.service';


@Component({
  selector: 'user-forum-detail-post',
  templateUrl: './user-forum-detail-post.component.html',
  styleUrls: ['./user-forum-detail-post.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class UserForumDetailPostComponent implements OnInit {
  public postID: number = 0;
  public currPost: CauHoiForum;
  public answerList: TraLoiForum[] = [];
  constructor(
    private dataSrv: DataService,
    private forumSrv: ForumService,
    private baivietSrv: BaivietService,
  ) { }

  ngOnInit() {
    this.dataSrv.currID.subscribe(id => this.postID = id);
    // console.log(this.postID);
    this.initData();
  }
  async initData() {
    await this.getPost();
  }
  async getPost() {
    //Lấy currPost từ localStorage
    this.currPost = JSON.parse(this.dataSrv.getItem('currPost'))[0];
    let answerPromise = await this.forumSrv.fetchTraloiByCauhoiId(this.currPost.id);
    console.log('1', answerPromise);
    answerPromise.forEach(ansPage => {
      ansPage.content.forEach(ans => {
        console.log(ans);
        let answer = new TraLoiForum();
        answer.id = ans.id;
        answer.noiDung = ans.noiDung;
        answer.nguoiTraLoiId = ans.nguoiTraLoi.id;
        answer.cauHoiId = ans.cauHoi.id;
        answer['nguoiDat'] = ans.nguoiTraLoi.hoTen;
        answer['ngayTraLoi'] = ans.ngayTraLoi;
        answer['numOfAns'] = 0;
        this.answerList.push(answer);

      });
    });
    this.baivietSrv.setPost(this.answerList,"locAnswerList"); 





  }

}
