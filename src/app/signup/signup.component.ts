import { Component, OnInit } from '@angular/core';
import { Config } from '../services/config';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signinLink = Config.front_endpoint + 'signin';
  constructor() { }

  ngOnInit() {
  }

}
