import { Component, OnInit } from '@angular/core';
import { BaivietService, Post } from '../services/forum/baiviet.service';
import { ChuyenmucService, ChuyenMuc } from '../services/forum/chuyenmuc.service';
import { ForumService, ChuDeForum, CauHoiForum, TraLoiForum } from '../services/forum/forum.service';
import { DronedaotaoService, DroneDaoTao} from '../services/training/dronedaotao.service';
import { DiadiembayService,DiaDiemBay} from '../services/training/diadiembay.service';
import { LichtapbayService} from '../services/event/lichtapbay.service';
import { ProductService} from '../services/product/product.service';
import { DataService } from '../services/helper/data.service';
import { IssueService } from '../services/event/issue.service.service';


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
    private productSrv: ProductService,
    private dataSrv: DataService,
    private issueSrv: IssueService
  ) { }

  ngOnInit() {
  }


}
