import { Component, OnInit, ViewChild, ViewEncapsulation, Input } from '@angular/core';
import { Config } from '../../services/config';
import { ToolbarComponent, MenuItemModel } from '@syncfusion/ej2-angular-navigations';
import { TooltipModule, Position, TooltipComponent } from '@syncfusion/ej2-angular-popups';
import { removeClass } from '@syncfusion/ej2-base';
import { Item } from 'src/app/services/cart.service';
import { DataService } from 'src/app/services/data.service';


@Component({
    selector: 'user-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
    @Input() count: number = 0;
    @Input() items: Item[] = [];
    // count: number = 0;
    // items: Item[] = []
    constructor(
        private dataSrv: DataService
    ) { }

    ngOnInit() {
        this.dataSrv.currCart.subscribe(items => this.items = items);
        if (this.count == 0) {
            this.items = this.dataSrv.getItemLocal("cartThuy");
            this.items.forEach(i => this.count += i.quantity);
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
            url: Config.front_endpoint + 'gioithieu',
            items: [
                {
                    text: 'Nông nghiệp 4.0 & Máy bay nông nghiệp',
                    url: Config.front_endpoint + 'gioithieu'
                },
                {
                    text: 'Sử dụng máy bay nông nghiệp',
                    url: Config.front_endpoint + 'gioithieu' + '/sudung'
                },
                {
                    text: 'Ứng dụng máy bay nông nghiệp tại Việt Nam',
                    url: Config.front_endpoint + 'gioithieu' + '/ungdung'

                },
                {
                    text: 'Trailer Video',
                    url: Config.front_endpoint + 'gioithieu' + '/trailer-video'

                },
            ]
        },
        {
            text: 'Sản phẩm',
            url: Config.front_endpoint + 'sanpham',

            items: [
                {
                    text: 'Máy bay nông nghiệp',
                    url: Config.front_endpoint + 'sanpham' + '/drone'
                },
                {
                    text: 'Phụ kiện',
                    url: Config.front_endpoint + 'sanpham' + '/phukien'
                },
                {
                    text: 'Hóa chất',
                    url: Config.front_endpoint + 'sanpham' + '/hoachat'
                },
            ]
        },

        {
            text: 'Diễn đàn',
            url: Config.front_endpoint + 'diendan' + '/tintuc',

            items: [
                {
                    text: 'Tin tức',
                    url: Config.front_endpoint + 'diendan' + '/tintuc',
                },
                {
                    text: 'Thảo luận',
                    url: Config.front_endpoint + 'diendan' + '/thaoluan',
                }
            ]
        },
        {
            text: 'Đào tạo',
            url: Config.front_endpoint + 'daotao' + '/baigiang',
            items: [
                {
                    text: 'Bài giảng',
                    url: Config.front_endpoint + 'daotao' + '/baigiang',
                },
                {
                    text: 'Bài test',
                    url: Config.front_endpoint + 'daotao' + '/baitest',
                },
                {
                    text: 'Lịch tập bay',
                    url: Config.front_endpoint + 'daotao' + '/user-calendar',
                },
            ]
        },
        {
            text: 'Liên hệ',
            url: Config.front_endpoint + 'lienhe'
        },
    ];

    public userData: object[] = [
        {
            text: 'Lịch sử mua hàng',
            url: Config.front_endpoint + 'user' + '/lichsu-muahang'
        },
        {
            text: 'Thông tin tài khoản',
            url: Config.front_endpoint + 'user' + '/thongtin-taikhoan'
        },
        {
            text: 'Logout',
            url: Config.front_endpoint + 'logout'
        }
    ];


    public urlNccBtn: any = Config.front_endpoint + 'ncc';
    public menuTemplate: any = '#shoppingMenu';
    public ddbTemplate: any = '#userDBtn';
    public searchTemplate: any = '#searchArea';
    public nccbtn: any = '#nccbtn';
    public cartbtn: any = '#cartbtn';

    // public onCreated(): void {
    //     this.tbObj.refreshOverflow();
    //     removeClass([this.tbObj.element.querySelector('.e-shopping-cart')], 'e-icons');
    // }
}
