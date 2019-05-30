import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import { ForumService, TopicTableRow, ChuDeForum, CauHoiForum } from '../../services/forum/forum.service';
import { DataService } from '../../services/helper/data.service';
import { BaivietService } from '../../services/forum/baiviet.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'user-forum-share',
  templateUrl: './user-forum-share.component.html',
  styleUrls: ['./user-forum-share.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserForumShareComponent implements OnInit {
  @ViewChild('topicDialog') topicDialog: DialogComponent;
  @ViewChild('questionDialog') questionDialog: DialogComponent;
  // Create element reference for dialog target element.
  @ViewChild('container', { read: ElementRef }) container: ElementRef;

  public targetElement: HTMLElement;
  public animationSettings: Object = { effect: 'Room' };
  public fields: Object = { text: 'tenChuDeCauHoi', value: 'id' };

  public topicList: Array<TopicTableRow> = [];
  public data_dropdown_choose_topic: ChuDeForum[];

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
    private authSrv: AuthService,

  ) { }

  ngOnInit() {
    this.loggedIn = this.authSrv.loggedIn;
    this.initData();
    this.initilaizeTarget();
  }


  async initData() {
    await this.getTopics();
    this.data_dropdown_choose_topic = this.topicList;
  }
  async getTopics() {
    let topicPromise = await this.forumSrv.fetchChudeForum();
    topicPromise.forEach(topic => {
      this.topicList.push(topic);
    });
  }


  public handleOnClickTopicOK: EmitType<object> = () => {
    let topic = new ChuDeForum(this.inputtopic);
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
    let question = new CauHoiForum(tieuDe.value, noiDung.value, 1, this.selectedTopicID);
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



  public initilaizeTarget: EmitType<object> = () => {
    this.targetElement = this.container.nativeElement.parentElement;
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
