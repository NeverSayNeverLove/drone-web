import { Component, OnInit, ViewChild, ViewEncapsulation, Input } from '@angular/core';
import { Config } from '../../services/helper/config';
import { ToolbarComponent, MenuItemModel } from '@syncfusion/ej2-angular-navigations';
import { TooltipModule, Position, TooltipComponent } from '@syncfusion/ej2-angular-popups';
import { removeClass } from '@syncfusion/ej2-base';
import { AuthService } from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import { Item } from 'src/app/services/product/cart.service';
import { DataService } from 'src/app/services/helper/data.service';


@Component({
    selector: 'user-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
    @Input() count: number = 0;
    @Input() items: Item[] = [];
    loggedIn: boolean; 
    @Input() brand: string = "Drone Calendar";
    @Input() slogan: string = "Come and Book flight schedules";


    constructor(
      private authSrv: AuthService,
      private dataSrv: DataService,
      private router: Router) { }

    ngOnInit() {
        this.loggedIn = this.authSrv.loggedIn;
        // this.dataSrv.currCart.subscribe(items => this.items = items);
        if (this.count == 0) {
            this.items = this.dataSrv.getItemLocal("cartThuy");
            if (this.items) {
                this.items.forEach(i => this.count += i.quantity);
            }
        }
    }

    @ViewChild('toolbar')
    public tbObj: ToolbarComponent;
    // Menu items definition 
    public data: MenuItemModel[] = [
        {
            text: 'Trang chủ',
            url: Config.front_endpoint
        },
        {
            text: 'Giới thiệu',
            url: Config.front_endpoint +'#',
            items: [
                {
                    text: 'Nông nghiệp 4.0 & Máy bay nông nghiệp',
                    url: Config.front_endpoint +'#'
                },
                {
                    text: 'Sử dụng máy bay nông nghiệp',
                    url: Config.front_endpoint +'#'
                },
                {
                    text: 'Ứng dụng máy bay nông nghiệp tại Việt Nam',
                    url: Config.front_endpoint +'#'

                },
                {
                    text: 'Trailer Video',
                    url: Config.front_endpoint +'#'

                },
            ]
        },
        {
            text: 'Sản phẩm',
            url: Config.front_endpoint + 'user-product-list',

            items: [
                {
                    text: 'Máy bay nông nghiệp',
                    url: Config.front_endpoint + 'user-product-list'
                },
                {
                    text: 'Phụ kiện',
                    url: Config.front_endpoint + '#'
                },
                {
                    text: 'Hóa chất',
                    url: Config.front_endpoint + '#'
                },
            ]
        },

        {
            text: 'Diễn đàn',
            url: Config.front_endpoint + 'user-news',

            items: [
                {
                    text: 'Tin tức',
                    url: Config.front_endpoint + 'user-news',
                },
                {
                    text: 'Thảo luận',
                    url: Config.front_endpoint + 'user-forum-topic-list',
                }
            ]
        },
        {
            text: 'Đào tạo',
            url: Config.front_endpoint + '#',
            items: [
                {
                    text: 'Bài giảng',
                    url: Config.front_endpoint + '#',
                },
                {
                    text: 'Bài test',
                    url: Config.front_endpoint + '#',
                },
                {
                    text: 'Lịch tập bay',
                    url: Config.front_endpoint + '/user-calendar',
                },
            ]
        },
        {
            text: 'Liên hệ',
            url: Config.front_endpoint + '#'
        },
    ];

    public userData: object[] = [
        {
            text: 'Lịch sử mua hàng',
            url: Config.front_endpoint + '/user-order-history'
        },
        {
            text: 'Thông tin tài khoản',
            url: Config.front_endpoint + '#'
        },
        {
            text: 'Sản phẩm mới',
            url: Config.front_endpoint + '#'               
        },
        {
            text: 'Diễn đàn',
            url: Config.front_endpoint + 'user-news',                

            items: [
                {
                    text: 'Tin tức', 
                    url: Config.front_endpoint + 'user-news',                
                },
                {
                    text: 'Thảo luận', 
                    url: Config.front_endpoint + 'user-forum-posts-of-topic',                
                }
            ]
        },
        {
            text: 'Đào tạo',
            url: Config.front_endpoint + '#',                
            items: [
                {
                    text: 'Bài giảng', 
                    url: Config.front_endpoint + '#',                
                },
                {
                    text: 'Bài test', 
                    url: Config.front_endpoint + '#',                
                },
                {
                    text: 'Lịch tập bay',
                    url: Config.front_endpoint +'user-calendar',                
                },
            ]
        },
        {
            text: 'Liên hệ',
            url: Config.front_endpoint + '#'
        },
    ];

  
    //   public urlNccBtn: any = Config.front_endpoint + 'ncc'; 
    public menuTemplate: any = '#shoppingMenu';
    public ddbTemplate: any = '#userDBtn';
    public searchTemplate: any = '#searchArea';
    public logoutbtn: any = '#logoutbtn';
    public loginbtn: any = '#loginbtn';
    public signupbtn: any = '#signupbtn';
    public nccbtn: any = '#nccbtn';
    public cartbtn: any = '#cartbtn';

    public onCreated(): void {
        this.tbObj.refreshOverflow();
        removeClass([this.tbObj.element.querySelector('.e-shopping-cart')], 'e-icons');
    }

    public logout() {
        window.location.reload();
        this.authSrv.logout();
    }

    public login() {
        this.router.navigateByUrl('/signin'); // chuyen sang trang login
    }

    public register() {
        this.router.navigateByUrl('/signup'); // chuyen sang trang signup
    }
}
