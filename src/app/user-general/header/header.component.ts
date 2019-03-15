import { Component, OnInit, ViewChild } from '@angular/core';
import { Config } from '../../services/config';
import { ToolbarComponent, MenuItemModel } from '@syncfusion/ej2-angular-navigations';
import { removeClass } from '@syncfusion/ej2-base';

@Component({
  selector: 'user-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  @ViewChild('toolbar')
  public tbObj: ToolbarComponent;
  // Menu items definition 
  public data: MenuItemModel[] = [
      {
          text: 'Trang chủ',
          url: Config.api_endpoint
      },
      {
          text: 'Giới thiệu',
          url: Config.api_endpoint + 'gioithieu',
          items: [
            {
                text: 'Nông nghiệp 4.0 & Máy bay nông nghiệp', 
                url: Config.api_endpoint + 'gioithieu'                 
            },
            {
                text: 'Sử dụng máy bay nông nghiệp', 
                url: Config.api_endpoint + 'gioithieu'+'/sudung'                 
            },
            {
                text: 'Ứng dụng máy bay nông nghiệp tại Việt Nam', 
                url: Config.api_endpoint + 'gioithieu'+'/ungdung'                

            },
            {
                text: 'Trailer Video', 
                url: Config.api_endpoint + 'gioithieu'+'/trailer-video'                 

            },     
          ]
      },
      {
        text: 'Sản phẩm',
        url: Config.api_endpoint + 'sanpham',                 

        items: [
        {
            text: 'Máy bay nông nghiệp',
            url: Config.api_endpoint + 'sanpham'+'/drone'                
        },
        {
            text: 'Phụ kiện',
            url: Config.api_endpoint + 'sanpham'+'/phukien'                
        },
        {
            text: 'Hóa chất',
            url: Config.api_endpoint + 'sanpham'+'/hoachat'                
        },
        {
            text: 'Phần mềm quản lí',
            url: Config.api_endpoint + 'sanpham'+'/software'                
        },
        {
            text: 'Khuyến mãi',
            url: Config.api_endpoint + 'sanpham'               
        },
        {
            text: 'Sản phẩm mới',
            url: Config.api_endpoint + 'sanpham'                
        }  
        ]
      },
      {
        text: 'Diễn đàn',
        url: Config.api_endpoint + 'diendan'+'/tintuc',                

          items: [
              {
                  text: 'Tin tức', 
                  url: Config.api_endpoint + 'diendan'+'/tintuc',                
              },
              {
                  text: 'Thảo luận', 
                  url: Config.api_endpoint + 'diendan'+'/thaoluan',                
              }
          ]
      },
      {
        text: 'Đào tạo',
        url: Config.api_endpoint + 'daotao'+'/baigiang',                
        items: [
            {
                text: 'Bài giảng', 
                url: Config.api_endpoint + 'daotao'+'/baigiang',                
            },
            {
                text: 'Bài test', 
                url: Config.api_endpoint + 'daotao'+'/baitest',                
            },
            {
                text: 'Lịch tập bay',
                url: Config.api_endpoint + 'daotao'+'/user-calendar',                
            },
        ]
      },
      {
        text: 'Liên hệ',
        url: Config.api_endpoint + 'lienhe'
      },
  ];

  public userData: object[] = [
      { text: 'Lịch sử mua hàng',
        url: Config.api_endpoint + 'user'+'/lichsu-muahang'        
    },
      { text: 'Thông tin tài khoản',
      url: Config.api_endpoint + 'user'+'/thongtin-taikhoan'               
    },
      { text: 'Logout',
      url: Config.api_endpoint + 'logout'        
    }
  ];

  
  public urlNccBtn: any = Config.api_endpoint + 'ncc'; 
  public menuTemplate: any = '#shoppingMenu';
  public ddbTemplate: any = '#userDBtn';
  public searchTemplate: any = '#searchArea';
  public nccbtn: any = '#nccbtn';

  public onCreated(): void {
      this.tbObj.refreshOverflow();
      removeClass([this.tbObj.element.querySelector('.e-shopping-cart')], 'e-icons');
  }
}
