import { Component, OnInit, OnDestroy } from '@angular/core';
import { AfterViewInit, ViewEncapsulation, Inject } from '@angular/core';
import { compile, detach } from '@syncfusion/ej2-base';
import { cardBook } from './data-source';
import { MultiSelect, SelectEventArgs, RemoveEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query, DataManager, Predicate } from '@syncfusion/ej2-data';

import { BaivietService, Post } from '../services/baiviet.service';
import { DataService } from '../services/data.service';

interface FilterKey {
  Code: string;
}
let card: NodeList; let cardEle: HTMLElement; let cardObj: JSON[] = cardBook as JSON[]; let data: Object[] = []; let multiSelectData: Object[] = []; let searchData: Object[] = [];
let searchValCount: number = 0; let filterCategory: { [key: string]: Object; }[] = [{ Name: 'Client-Side', Code: 'client' }, { Name: 'Server-Side', Code: 'server' }, { Name: 'Front-End', Code: 'ui' }];
let emptyData: boolean = true;

/*  Initialize MultiSelect component */
let multiselectComp: MultiSelect;

@Component({
  selector: 'user-news',
  templateUrl: './user-news.component.html',
  styleUrls: ['./user-news.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class UserNewsComponent implements OnInit, OnDestroy {

  public DataList: any = [];
  public postList: Array<Post> = [];

  constructor(
    private postSrv: BaivietService,
    private dataSrv: DataService) { }

  //ngOnInit: sau khi dữ liệu load xong
  public ngOnInit(): void {
    console.log("dung");
    this.DataList = cardBook;
    this.initData();
  }

  //ngOnDestroy: khi chuyển sang trang mới
  public ngOnDestroy() {
    console.log("on destroy");
  }

  ngAfterViewInit(): void {
    multiselectComp = new MultiSelect({
      // set the local data to dataSource property
      dataSource: filterCategory,
      // map the appropriate columns to fields property
      fields: { text: 'Name', value: 'Code' },
      // set the placeholder to MultiSelect input element
      placeholder: 'Search by categories',
      select: this.multiSelectFun.bind(this),
      removed: this.multiSelectRemove.bind(this),
    });
    multiselectComp.appendTo('#local');
    this.cardRendering(cardObj);
    document.getElementById('search_Card').onkeyup = (e: KeyboardEvent) => {
      if (e.code === 'Tab' || e.code === 'Escape' || e.code === 'ShiftLeft' || (e.code === 'Backspace' && emptyData)) {
        return;
      }
      let inputVal: string = (e.target as HTMLInputElement).value;
      inputVal.length === 0 ? emptyData = true : emptyData = false;
      this.searchFilter(inputVal);
    };
  }

  /* Remove event function for multiSelect component */
  public multiSelectRemove(e: RemoveEventArgs): void {
    let cardDa: Object[] = searchData.length > 0 ? searchData : (multiSelectData.length > 0 ? multiSelectData : cardObj);
    if (multiselectComp.value && multiselectComp.value.length === 0 && searchValCount === 0) {
      multiSelectData = cardDa;
      this.cardRendering(cardObj);
    } else if (multiselectComp.value.length === 0 && searchValCount > 0) {
      this.searchFilter((document.getElementById('search_Card') as HTMLInputElement).value);
    } else if (multiselectComp.value.length === 0) {
      multiSelectData = cardDa;
      this.cardRendering(cardDa);
    } else {
      let keywords: string[] = (e.itemData as FilterKey).Code.split(',');
      let dublicate: Object[];
      keywords.forEach((key: string): void => {
        dublicate = new DataManager(cardObj as JSON[]).executeLocal(new Query().where('cardImage.tag', 'Contains', key, true));
        dublicate.forEach((da: Object): void => {
          if (cardDa.indexOf(da) !== -1) {
            cardDa.splice(cardDa.indexOf(da), 1);
          }
        });
        multiSelectData = cardDa;
      });
      this.cardRendering(multiSelectData);
    }
  }
  public multiSelectFun(e: SelectEventArgs): void {
    let keywords: string[] = (e.itemData as FilterKey).Code.split(','); let dublicate: Object[];
    let cardDa: Object[] = searchData.length > 0 ? searchData : cardObj;
    if (multiselectComp.value && multiselectComp.value.length === 0 && searchValCount === 0) {
      multiSelectData = [];
    }
    keywords.forEach((key: string): void => {
      dublicate = new DataManager(cardDa as JSON[]).executeLocal(new Query().where('cardImage.tag', 'Contains', key, true));
      if (dublicate.length === 0) {
        multiSelectData = [];
        return;
      }
      dublicate.forEach((da: Object): void => {
        if (multiSelectData.indexOf(da) === -1) {
          multiSelectData.push(da);
        }
      });
    });
    this.cardRendering(multiSelectData);
  }
  /* Function for Filtering Cards */
  public searchFilter(key: string): void {
    searchValCount = key.length;
    let predicate: Predicate = new Predicate('cardContent', 'Contains', key, true);
    predicate = predicate.or('cardImage.title', 'Contains', key, true).or('header_title', 'Contains', key, true).or('header_subtitle', 'Contains', key, true);
    let cardDa: Object[] = (multiSelectData.length > 0 && multiselectComp.value.length > 0) ? multiSelectData : cardObj;
    searchData = data = new DataManager(cardDa as JSON[]).executeLocal(new Query().where(predicate));
    this.cardRendering(data);
  }
  public cardRendering(cardObj: Object[]): void {
    let errorContent: HTMLElement = document.querySelector('.tile_layout .row.error') as HTMLElement;
    if (cardObj.length > 0) {
      errorContent.style.display = 'none';
      this.DataList = cardObj;
    } else {
      this.DataList = [];
      errorContent.style.display = 'flex';
    }
  }

  async initData() {
    await this.getPost();
  }

  //To get data lên view
  async getPost() {

    //Lấy dữ liệu từ local trước
    this.postList = JSON.parse(JSON.stringify(this.postSrv.getPost())); //deep : tạo 1 bản sao mới - truyền tham trị (kể cả object trong object)
    //Nếu k có thì mới fetch
    if (!this.postList.length) {
      let postPromise = await this.postSrv.fetchPostByIdChuyenMuc(2);
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
      this.postSrv.setPost(this.postList);
      console.log('post list:', this.postList);
    }
  }

  sendCurrPostID(id) {
    this.dataSrv.sendPostID(id);
  }

}
