import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';


import { ForumService, ChuDeForum, CauHoiForum, TraLoiForum } from '../../services/forum/forum.service';
import { DataService } from '../../services/helper/data.service';
import { BaivietService } from '../../services/forum/baiviet.service';


@Component({
  selector: 'user-forum-detail-post',
  templateUrl: './user-forum-detail-post.component.html',
  styleUrls: ['./user-forum-detail-post.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class UserForumDetailPostComponent implements OnInit {
  public brand: string = "Drone News";
  public slogan: string = "Những thông tin mới nhất về Drone";
  public postID: number = 0;
  public currPost: CauHoiForum;
  public answerList: TraLoiForum[] = [];
  public loadingData: boolean = true;
  constructor(
    private dataSrv: DataService,
    private forumSrv: ForumService,
    private baivietSrv: BaivietService,
  ) { }

  ngOnInit() {
    this.dataSrv.currID.subscribe(id => this.postID = id);
    console.log(this.postID);
    this.initData();
  }
  ngOnChanges() {
    console.log("changes");
  }

  private async initData() {
    await this.getPost(this.postID);
    this.loadingData = false;
  }
  private async getPost(postIDParam: number) {
      let postPromise = await this.forumSrv.fetchCauhoiById(postIDParam);
      console.log("postPromise",postPromise);
      this.currPost = await new CauHoiForum(postPromise.tieuDe, postPromise.noiDung, postPromise.nguoiDat.id, postPromise.chuDe.id, postPromise.id);
      this.currPost['ngayDat'] = await postPromise.ngayDat;
      this.currPost['nguoiDat'] = await postPromise.nguoiDat.hoTen;
      this.dataSrv.setItemLocal("currPost1",this.currPost);
    
    
    
    // let answerPromise = await this.forumSrv.fetchTraloiByCauhoiId(postIDParam);
    // console.log('1', answerPromise);
    // answerPromise.forEach(ansPage => {
    //   ansPage.content.forEach(ans => {
    //     console.log(ans);
    //     let answer = new TraLoiForum();
    //     answer.id = ans.id;
    //     answer.noiDung = ans.noiDung;
    //     answer.nguoiTraLoiId = ans.nguoiTraLoi.id;
    //     answer.cauHoiId = ans.cauHoi.id;
    //     answer['nguoiDat'] = ans.nguoiTraLoi.hoTen;
    //     answer['ngayTraLoi'] = ans.ngayTraLoi;
    //     answer['numOfAns'] = 0;
    //     this.answerList.push(answer);

    //   });
    // });
    // this.baivietSrv.setPost(this.answerList,"locAnswerList"); 
  }

}
