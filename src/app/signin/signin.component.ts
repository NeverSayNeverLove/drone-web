import { Component, OnInit } from '@angular/core';
import { Config } from '../services/config';

import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';


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
    private userSrv: UserService) { }

  ngOnInit() {
  }

  loginUser(event) {
    event.preventDefault();
    const target = event.target;
    const email = target.querySelector('#email').value;
    const password = target.querySelector('#password').value;

    this.authSrv.getUserDetails(email, password).subscribe(
    data => {
      let key = 'UserToken'
      this.dataSrv.setItem(key, data['access_token']);
      key = 'TypeToken'
      this.dataSrv.setItem(key, data['token_type']);
      let currUser = this.userSrv.whoIAm(data['token_type'] + ' ' + data['access_token']);
      currUser.then(user => {
        key = 'CurrentUser'
        this.userSrv.setCurrentUser(key, user);
        console.log('current user1:', user);
        console.log('current user2:', this.userSrv.getCurrentUser(key));
      })
    },
    (error: any) => {
      console.log(error)
    });
  }

}
