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
import { IImage } from 'ng-simple-slideshow/src/app/modules/slideshow/IImage';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // public slideIndex = 0;
  post: Post;
  chuyenMuc: ChuyenMuc;
  chuDeForum: ChuDeForum;
  cauHoiForum: CauHoiForum;
  traLoiForum: TraLoiForum;
  traLoiForum1: TraLoiForum;
  drone: DroneDaoTao;
  place: DiaDiemBay;

  imageUrls: (string | IImage)[] = [
    { url: '../../assets/images/slide_13.jpg', caption: 'Drone Calendar', href: 'user-calendar' },
    { url: '../../assets/images/slide_9.jpg', caption: 'Drone Calendar', href: 'user-calendar' },
    { url: '../../assets/images/drone_4.jpg', caption: 'Drone Calendar', href: 'user-calendar' },
    { url: '../../assets/images/slide_16.jpg', caption: 'Drone Calendar', href: 'user-calendar' },
    { url: '../../assets/images/slide_15.jpg', caption: 'Drone Calendar', href: 'user-calendar' },
  ];
  height: string = '400px';
  minHeight: string;
  arrowSize: string = '30px';
  showArrows: boolean = true;
  disableSwiping: boolean = false;
  autoPlay: boolean = true;
  autoPlayInterval: number = 3333;
  stopAutoPlayOnSlide: boolean = true;
  debug: boolean = false;
  backgroundSize: string = 'cover';
  backgroundPosition: string = 'center center';
  backgroundRepeat: string = 'no-repeat';
  showDots: boolean = true;
  dotColor: string = '#FFF';
  showCaptions: boolean = true;
  captionColor: string = '#FFF';
  captionBackground: string = 'rgba(0, 0, 0, .35)';
  lazyLoad: boolean = false;
  hideOnNoSlides: boolean = false;
  width: string = '100%';
  fullscreen: boolean = false;
  
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
