import { Component, OnInit,  ElementRef, ViewChild } from '@angular/core';
import { Config } from '../services/helper/config';

import { AuthService } from '../services/auth/auth.service';
import { DataService } from '../services/helper/data.service';
import { UserService } from '../services/auth/user.service';
import {Router} from '@angular/router';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';


@Component({
  // moduleId: module.id,
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  // showModal: boolean = false;
  loadingData: boolean = false;
  signupLink = Config.front_endpoint + 'signup';
  forgotpassLink = Config.front_endpoint + 'forgotpass';

  @ViewChild('ejDialog') ejDialog: DialogComponent;
  // Create element reference for dialog target element.
  @ViewChild('container', { read: ElementRef }) container: ElementRef;
  // The Dialog shows within the target element.
  public targetElement: HTMLElement;
  public animationSettings: Object = { effect: 'Room' };

    // Close the Dialog, while clicking "OK" Button of Dialog
  public dlgButtonClick: EmitType<object> = () => {
    this.ejDialog.hide();
  }
  public buttons: Object[] = [{ click: this.dlgButtonClick.bind(this), buttonModel: { content: 'OK', isPrimary: true } }];

  constructor(
    private authSrv: AuthService,
    private dataSrv: DataService,
    private userSrv: UserService,
    private router: Router) { }

  ngOnInit() {
    // kiem tra xem da login chua
    if (this.authSrv.loggedIn) {
      this.router.navigateByUrl(''); // neu da login thi chuyen sang Home
    }
    this.initilaizeTarget();
    // this.ejDialog.hide();
  }

  // Initialize the Dialog component target element.
  public initilaizeTarget: EmitType<object> = () => {
    this.targetElement = this.container.nativeElement.parentElement;
  }
  // Sample level code to handle the button click action
  public onOpenDialog = function(): void {
    this.ejDialog.animationSettings = { effect: 'Zoom', duration: 400 };
      // Call the show method to open the Dialog
      this.ejDialog.show();
  };



  loginUser(event) {
    this.loadingData = true;
    event.preventDefault();
    const target = event.target;
    const email = target.querySelector('#email').value;
    const password = target.querySelector('#password').value;
    this.authSrv.login(email, password).subscribe(
    data => {
      // Luu token_type vao localStorage
      let key = 'token_type'
      this.dataSrv.setItemLocal(key, data['token_type']);
      let currUser = this.userSrv.whoIAm(data['token_type'] + ' ' + data['access_token']);
      currUser.then(user => {
        // Luu thong tin cua current user
        key = 'CurrentUser'
        this.userSrv.setCurrentUser(key, user)
        key = 'PriorUrl'
        let priorUrl = this.authSrv.getPriorUrl(key); // lay Url da nhap truoc do
        priorUrl = priorUrl ? priorUrl : '' // Neu ko co Url thi se chuyen ve trang home
        this.router.navigateByUrl(priorUrl);
      })
    },
    (error: any) => {
      console.log(error);
      this.loadingData = false;
      // this.showModal = true;
      this.onOpenDialog();
    });
  }

}
