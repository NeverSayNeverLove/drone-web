import { Component, OnInit } from '@angular/core';
import { Config } from '../services/config';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signupLink = Config.front_endpoint + 'signup';
  forgotpassLink = Config.front_endpoint + 'forgotpass';
  constructor() { }

  ngOnInit() {
  }

}
