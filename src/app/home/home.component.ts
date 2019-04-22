import { Component, OnInit } from '@angular/core';
import { BaivietService, Post } from '../services/baiviet.service';
import { ChuyenmucService, ChuyenMuc } from '../services/chuyenmuc.service';
import { ForumService, ChuDeForum, CauHoiForum, TraLoiForum } from '../services/forum.service';
import { DronedaotaoService, DroneDaoTao} from '../services/dronedaotao.service';
import { DiadiembayService,DiaDiemBay} from '../services/diadiembay.service';
import { LichtapbayService} from '../services/lichtapbay.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  post: Post;
  chuyenMuc: ChuyenMuc;
  chuDeForum: ChuDeForum;
  cauHoiForum: CauHoiForum;
  traLoiForum: TraLoiForum;
  traLoiForum1: TraLoiForum;
  drone: DroneDaoTao;
  place: DiaDiemBay;
  constructor(
    private postSrv: BaivietService,
    private chuyenMucSrv: ChuyenmucService,
    private forumSrv: ForumService,
    private droneDaotaoSrv: DronedaotaoService,
    private placeSrv: DiadiembayService,
    private planSrv: LichtapbayService,
  ) { }

  ngOnInit() {
    // let postPromise = this.postSrv.fetchPostByIdNguoiTao(1);
    // console.log(postPromise);
   
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

    // let postPromise = this.postSrv.fetchPostByIdNguoiTao(1);

    // this.post = new Post('tiêu đề post', 'this is a fake post', null, true, 2, 1);
    // this.postSrv.createPost(this.post).subscribe(
    //   (post: Post) => { console.log(post) },
    //   (error: any) => { console.log(error) });

    // this.chuyenMuc = new ChuyenMuc ('chuyên mục fake name');
    // this.chuyenMucSrv.createChuyenMuc(this.chuyenMuc).subscribe(
    //   (chuyenMuc: ChuyenMuc) => { console.log(chuyenMuc) },
    //   (error: any) => { console.log(error) });

    // this.chuDeForum = new ChuDeForum('Drone chính hãng');
    // this.forumSrv.createChuDeForum(this.chuDeForum).subscribe(
    //   (chuDeForum: ChuDeForum) => { console.log(chuDeForum) },
    //   (error: any) => { console.log(error) }
    // );

    // this.cauHoiForum = new CauHoiForum('fake tiêu đề','fake nội dung',1,2);
    // this.forumSrv.createCauHoiForum(this.cauHoiForum).subscribe(
    //   (cauHoiForum: CauHoiForum) => { console.log(cauHoiForum) },
    //   (error: any) => { console.log(error) }
    // );

    // this.traLoiForum = new TraLoiForum('fake nội dung', 1, 2);
    // this.forumSrv.createTraLoiForum(this.traLoiForum).subscribe(
    //   (traLoiForum: TraLoiForum) => { console.log(traLoiForum) },
    //   (error: any) => { console.log(error) }
    // );
    // this.traLoiForum.noiDung = 'update';
    // this.forumSrv.updateTraLoiForum(this.traLoiForum1).subscribe(
    //   (traLoiForum: TraLoiForum) => { console.log(traLoiForum) },
    //   (error: any) => { console.log(error) }
    // );

    // let dronedaotaoPromise = this.droneDaotaoSrv.fetchDroneDaotaoById(3);
    // let dronePromise = this.droneDaotaoSrv.fetchDroneDaotaoByNhacungcapId(1);
    // console.log(dronedaotaoPromise); 
    // console.log(dronePromise);

    // this.drone = new DroneDaoTao('Drone tưới nước','dùng để tưới nước cho những cánh đồng lớn',3);
    // this.droneDaotaoSrv.createPost(this.drone).subscribe(
    //   (drone: DroneDaoTao) => {console.log(drone)},
    //   (error: any) => {console.log(error)}
    // );
 

    // this.place = new DiaDiemBay('306-B9',4);
    // this.placeSrv.createDiadiemBay(this.place).subscribe(
    //   (place: DiaDiemBay) => {console.log('creat place:', place)},
    //   (error: any) => {console.log(error)}
    // );
    //  let placePromise = this.placeSrv.fetchFlyPlaceByNhacungcapId(4);
    //  console.log(placePromise);
    //  let planPromise = this.planSrv.fetchFlyPlanByUserId_StartToFrom_NccId(5,new Date('2019-03-01 00:00'),new Date('2019-04-15 00:00'),3);
    //  console.log(planPromise);

    // let lichTapBay = this.planSrv.fetchFlyPlanBy_NccId_StartToFrom_UserId(1, "2019-04-08", "2019-04-15", "2019-04-08", "2019-04-25", "", "", "", "");
    // lichTapBay.then(value => {
    // console.log(value);
    // });
    

    // let lichTapBay = this.planSrv.fetchFlyPlanByUserId_StartToFrom_NccId( 3, "2019-04-03", "", "2019-04-10", "", "", "", "", "");
    // lichTapBay.then(value => {
    // console.log(value);
    // });

  }


}
