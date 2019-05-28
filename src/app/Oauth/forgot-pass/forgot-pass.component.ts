import { Component, OnInit } from '@angular/core';
import { Config } from '../../services/helper/config';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.scss']
})
export class ForgotPassComponent implements OnInit {

  returnLink = Config.front_endpoint + 'signin';
  constructor() { }

  ngOnInit() {
  }

}
