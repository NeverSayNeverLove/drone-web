import { Component, OnInit } from '@angular/core';
import { Config } from '../services/config';

import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signupLink = Config.front_endpoint + 'signup';
  forgotpassLink = Config.front_endpoint + 'forgotpass';
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
  }

  loginUser(event) {
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
      console.log(error)
    });
  }

}
