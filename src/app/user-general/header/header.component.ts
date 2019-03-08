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
          text: 'Appliances',
          items: [
              {
                  text: 'Kitchen',
                  items: [
                      { text: 'Electric Cookers' },
                      { text: 'Coffee Makers' },
                      { text: 'Blenders' }
                  ]
              },
              {
                  text: 'Washing Machine',
                  items: [
                      { text: 'Fully Automatic' },
                      { text: 'Semi Automatic' }
                  ]
              },
              {
                  text: 'Air Conditioners',
                  items: [
                      { text: 'Inverter ACs' },
                      { text: 'Split ACs' },
                      { text: 'Window ACs' }
                  ]
              }
          ]
      },
      {
          text: 'Accessories',
          items: [
              {
                  text: 'Mobile',
                  items: [
                      { text: 'Headphones' },
                      { text: 'Memory Cards' },
                      { text: 'Power Banks' }
                  ]
              },
              {
                  text: 'Computer',
                  items: [
                      { text: 'Pendrives' },
                      { text: 'External Hard Disks' },
                      { text: 'Monitors' }
                  ]
              }
          ]
      },
      {
          text: 'Fashion',
          items: [
              {
                  text: 'Men',
                  items: [
                      { text: 'Shirts' },
                      { text: 'Jackets' },
                      { text: 'Track Suits' }
                  ]
              },
              {
                  text: 'Women',
                  items: [
                      { text: 'Kurtas' },
                      { text: 'Salwars' },
                      { text: 'Sarees' }
                  ]
              }
          ]
      },
      {
          text: 'Home & Living',
          items: [
              {
                  text: 'Furniture',
                  items: [
                      { text: 'Beds' },
                      { text: 'Mattresses' },
                      { text: 'Dining Tables' }
                  ]
              },
              {
                  text: 'Decor',
                  items: [
                      { text: 'Clocks' },
                      { text: 'Wall Decals' },
                      { text: 'Paintings' }
                  ]
              }
          ]
      }
  ];

  public userData: object = [
      { text: 'My Profile' },
      { text: 'Orders' },
      { text: 'Rewards' },
      { text: 'Logout' }
  ];

  public menuTemplate: any = '#shoppingMenu';
  public ddbTemplate: any = '#userDBtn';
  public searchTemplate: any = '#searchArea';

  public onCreated(): void {
      this.tbObj.refreshOverflow();
      removeClass([this.tbObj.element.querySelector('.e-shopping-cart')], 'e-icons');
  }
}
