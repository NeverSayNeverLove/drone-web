import { Component, OnInit } from '@angular/core';
import { Config } from '../../services/helper/config';

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

  register(event) {
    event.preventDefault();
    const target = event.target;
    const username = target.querySelector('#username').value;
    const email = target.querySelector('#email').value;
    const password = target.querySelector('#password').value;
    console.log(username, email, password);
  }
}
