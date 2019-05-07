import { Component, OnInit, OnChanges, ViewEncapsulation, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import { ForumService, TopicTableRow, ChuDeForum, CauHoiForum } from '../services/forum.service';
import { DataService } from '../services/data.service';
import { BaivietService} from '../services/baiviet.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'user-forum-share',
  templateUrl: './user-forum-share.component.html',
  styleUrls: ['./user-forum-share.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserForumShareComponent implements OnInit, OnChanges {
  @ViewChild('topicDialog') topicDialog: DialogComponent;
  @ViewChild('questionDialog') questionDialog: DialogComponent;
  // Create element reference for dialog target element.
  @ViewChild('container', { read: ElementRef }) container: ElementRef;

  public targetElement: HTMLElement;
  public animationSettings: Object = { effect: 'Room' };
  public fields: Object = { text: 'tenChuDeCauHoi', value: 'id' };

  public topicList: Array<TopicTableRow> = [];
  public data_topicsList: TopicTableRow[];

  selectedTopicID: number;

  public inputtopic: string = "";
  public inputtitle: string = "";
  public inputcontent: string = "";
  public topic_autoselect: string = ""; 
  
  loggedIn: boolean;

  @Output() messageEvent = new EventEmitter<Array<TopicTableRow>>();

  constructor(
    private forumSrv: ForumService,
    private dataSrv: DataService,
    private baivietSrv: BaivietService,
    private authSrv: AuthService,

  ) { }

  ngOnInit() {
    this.loggedIn = this.authSrv.loggedIn;
    this.initData();
    this.sendMessage();
    this.initilaizeTarget();
  }
  ngOnChanges() {
    this.sendMessage();
  }
  sendMessage() {
    this.messageEvent.emit(this.topicList);
  }

  async initData() {
    await this.getTopic();
    this.data_topicsList = this.topicList;
  }
  async getTopic() {
    let topicPromise = await this.forumSrv.fetchChudeForum();
    let postPromise = await this.forumSrv.fetchCauhoiForum();
    console.log('postPromise',postPromise);
    topicPromise.forEach(t => {      
      let topicTr: TopicTableRow = new TopicTableRow();
      topicTr.id = t.id;
      topicTr.tenChuDeCauHoi = t.tenChuDeCauHoi;
      this.topicList.push(topicTr);
    });
    this.topicList.forEach(t => {
       postPromise.forEach(postPage =>{
         postPage.content.forEach(post =>{
            if(post.chuDe.id === t.id){
              t.numOfPost ++;
            }
         });
       }); 
    });
    console.log('topicList',this.topicList);
    this.baivietSrv.setPost(this.topicList,"locPostList"); 
  } 
 
  public initilaizeTarget: EmitType<object> = () => {
    this.targetElement = this.container.nativeElement.parentElement;
  }
 
  public handleOnClickTopicOK: EmitType<object> = () => {
    let topicName: HTMLInputElement = document.getElementById('topic-dialog').querySelector('#nameTopic');
    let topic = new ChuDeForum (topicName.value);
    this.forumSrv.createChuDeForum(topic).subscribe(
      (topic: ChuDeForum) => { console.log(topic) },
      (error: any) => { console.log(error) }
    );
    this.topicDialog.hide();
    
  }
 
  public handleOnClickTopicCancel: EmitType<object> = () => {
    this.topicDialog.hide();
  }

  public handleOnSelectedTopic($event) {
    if ($event.e) {
      this.selectedTopicID = Number($event['itemData'].id);
    }
  }

  public handleOnClickQuestionOk: EmitType<object> = () => {
    let tieuDe: HTMLInputElement = document.getElementById('ques-dialog').querySelector('#title');
    let noiDung: HTMLInputElement = document.getElementById('ques-dialog').querySelector('#content');
    console.log(noiDung.value);
    console.log(tieuDe.value);
    console.log(this.selectedTopicID);
    let question = new CauHoiForum (tieuDe.value, noiDung.value,1,this.selectedTopicID);
    this.forumSrv.createCauHoiForum(question).subscribe(
      (question: CauHoiForum) => { console.log(question) },
      (error: any) => { console.log(error) }
    );
    this.questionDialog.hide();
  }


  public handleOnClickQuestionCancel: EmitType<object> = () => {
    console.log('cancel question');
    this.questionDialog.hide();
  }

  
  

  public topicBtnClick = function (event: any): void {
    this.topicDialog.animationSettings = { effect: 'Zoom', duration: 400 };
    this.topicDialog.show();
  }
  public questionBtnClick = function (event: any): void {
    this.questionDialog.animationSettings = { effect: 'Zoom', duration: 400 };
    this.questionDialog.show();
  }

  


}
