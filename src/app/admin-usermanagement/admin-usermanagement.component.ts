import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { EditService, PageService, CommandColumnService, CommandModel, Column, IRow, GridComponent, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { UserService, User, VaiTro } from '../services/auth/user.service';
import { closest } from '@syncfusion/ej2-base';
import { AuthService } from '../services/auth/auth.service';
import { DataService } from '../services/helper/data.service';


@Component({
  selector: 'admin-usermanagement',
  templateUrl: './admin-usermanagement.component.html',
  styleUrls: ['./admin-usermanagement.component.sass'],
  providers: [ EditService, PageService, CommandColumnService]
})
export class AdminUsermanagementComponent implements OnInit {

  @ViewChild('grid') public grid: GridComponent;

  public data: Object[];
  public editSettings: Object;
  public rolerules: Object;
  public toolbar: string[];
  public roleparams: Object;
  public pageSettings: Object;
  public commands: CommandModel[];

  constructor(
    private userSrv: UserService,
    private authSrv: AuthService,
    private dataSrv: DataService,
    private router: Router) { }

  ngOnInit() {
    // kiem tra xem da login chua
    if (!this.authSrv.loggedIn) { // neu chua login
        let key = 'PriorUrl'
        this.dataSrv.setItem(key, '/admin-usermanagement') // Luu url lai de sau khi login se nhay vao trang nay
        this.router.navigateByUrl('/signin'); // chuyen sang trang login
        return;
    }

    // kiem tra nguoi dung hien tai co la Admin khong, neu khong chuyen ve Home
    if (!this.userSrv.isAdmin) {
      this.router.navigateByUrl(''); // chuyen sang trang home
      return;
    }
    this.initItemList();

    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal', allowEditOnDblClick: false };
    this.rolerules = { required: true };
    this.pageSettings = {pageCount: 5};
    this.commands = [{ type: 'Edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat' } },
    { type: 'Delete', buttonOption: { click: this.onClickDelete.bind(this), iconCss: 'e-icons e-delete', cssClass: 'e-flat' } },
    { type: 'Save', buttonOption: { click: this.onClickSave.bind(this), iconCss: 'e-icons e-update', cssClass: 'e-flat' } },
    { type: 'Cancel', buttonOption: { iconCss: 'e-icons e-cancel-icon', cssClass: 'e-flat' } }];
    this.toolbar = ['Search'];
    
  }

  private onClickSave(args: Event){
    let rowObj: IRow<Column> = this.grid.getRowObjectFromUID(closest(args.target as Element, '.e-row').getAttribute('data-uid'));
    let editedUser: object = rowObj.data;
    console.log(editedUser)
  }

  private onClickDelete(args: Event){
    const rowObj: IRow<Column> = this.grid.getRowObjectFromUID(closest(args.target as Element, '.e-row').getAttribute('data-uid'));
    const deletedUser: object = rowObj.data;
    console.log(deletedUser)
  }


  private initItemList() {
    this.fetchAllUser();
  }

  private async fetchAllUser(){
    let userList: Array<User> = [];
    let token = this.userSrv.getToken();
    let userListPro = await this.userSrv.fetchAllUserList(token);
    userListPro.forEach(users => {
      users['data'].forEach(u => {
        let vaitro = this.userSrv.getRole(u.vai_tro_id);
        let user = new User(u.dia_chi, u.email, u.ho_ten, u.id, u.so_dien_thoai, vaitro);
        user['tenVaiTro'] = vaitro.tenVaiTro;
        userList.push(user);
      });
    });
    this.data = userList;
  }
}