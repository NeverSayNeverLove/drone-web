import { Component, OnInit } from '@angular/core';
import { BaivietService } from '../services/baiviet.service';
import { ChuyenmucService } from '../services/chuyenmuc.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private postSrv: BaivietService,
    private chuyenMucSrv: ChuyenmucService
    ) { }

  ngOnInit() {
    // let postPromise = this.postSrv.fetchPost();
    // let chuyenMucPromise = this.postSrv.fetchChuyenMuc();
    // let chuyenMucPromise = this.chuyenMucSrv.fetchChuyenMuc();
    let chuyenMucPromise = this.chuyenMucSrv.fetchChuyenMucById(2);
    
  }

}
