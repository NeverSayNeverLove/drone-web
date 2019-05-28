import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './Shop/product/product.component';
import { SigninComponent } from './Oauth/signin/signin.component';
import { UserNewsComponent } from './Forum/user-news/user-news.component';
import { UserCalendarComponent } from './Calendar/user-calendar/user-calendar.component';
import { HeaderComponent } from './user-general/header/header.component';
import { FooterComponent } from './user-general/footer/footer.component';
import { SignupComponent } from './Oauth/signup/signup.component';
import { ForgotPassComponent } from './Oauth/forgot-pass/forgot-pass.component';
import { UserDetailNewComponent } from './Forum/user-detail-new/user-detail-new.component';
import { UserForumShareComponent } from './Forum/user-forum-share/user-forum-share.component';
import { UserForumDetailPostComponent } from './Forum/user-forum-detail-post/user-forum-detail-post.component';
import { UserForumTopicListComponent } from './Forum/user-forum-topic-list/user-forum-topic-list.component';
import { UserForumPostsOfTopicComponent } from './Forum/user-forum-posts-of-topic/user-forum-posts-of-topic.component';
import { UserProductListComponent } from './Shop/user-product-list/user-product-list.component';
import { UserDetailProductComponent } from './Shop/user-detail-product/user-detail-product.component';
import { UserCartComponent } from './Shop/user-cart/user-cart.component';
import { UserDetailBillComponent } from './Shop/user-detail-bill/user-detail-bill.component';
import { UserOrderHistoryComponent } from './Shop/user-order-history/user-order-history.component';
import { SupAddProductComponent } from './Shop/sup-add-product/sup-add-product.component';
import { EditIssueComponent } from './Calendar/edit-issue/edit-issue.component';
import { EditLichtapbayComponent } from './Calendar/edit-lichtapbay/edit-lichtapbay.component';
import { NewLichtapbayComponent } from './Calendar/new-lichtapbay/new-lichtapbay.component';
import { NewIssueComponent } from './Calendar/new-issue/new-issue.component';
import { AdminUsermanagementComponent } from './admin-usermanagement/admin-usermanagement.component';
import { ContactComponent } from './contact/contact.component';

// syncfusion
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import {
    TimelineViewsService, TimelineMonthService, MonthAgendaService,
    DayService, WeekService, MonthService, ResizeService, DragAndDropService
} from '@syncfusion/ej2-angular-schedule';
import { MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { CalendarAllModule } from '@syncfusion/ej2-angular-calendars';
import { MenuModule, ToolbarModule, AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { GridModule, EditService, ToolbarService, CommandColumnService} from '@syncfusion/ej2-angular-grids';
import { PageService, SortService, FilterService} from '@syncfusion/ej2-angular-grids';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { DateTimePickerModule } from "@syncfusion/ej2-angular-calendars";
import { RadioButtonModule } from '@syncfusion/ej2-angular-buttons';

import {SlideshowModule} from 'ng-simple-slideshow';







@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    SigninComponent,
    UserCalendarComponent,
    HeaderComponent,
    FooterComponent,
    UserNewsComponent,
    SignupComponent,
    ForgotPassComponent,
    UserDetailNewComponent,
    UserForumShareComponent,
    UserForumDetailPostComponent,
    UserForumTopicListComponent,
    UserForumPostsOfTopicComponent,
    UserProductListComponent,
    UserDetailProductComponent,
    UserCartComponent,
    UserDetailBillComponent,
    UserOrderHistoryComponent,
    SupAddProductComponent,
    EditIssueComponent,
    EditLichtapbayComponent,
    NewLichtapbayComponent,
    NewIssueComponent,
    AdminUsermanagementComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ScheduleModule,
    CalendarAllModule,
    MenuModule,
    ToolbarModule,
    MultiSelectAllModule,
    DropDownButtonModule,
    AccordionModule,
    ButtonModule,
    GridModule,
    DialogModule,
    DropDownListModule,
    TreeViewModule,
    TabModule,
    DateTimePickerModule,
    RadioButtonModule,
    SlideshowModule,
  ],
  providers: [DayService, WeekService, MonthService, ResizeService, DragAndDropService,
    TimelineMonthService, MonthAgendaService, TimelineViewsService,
    PageService, SortService, FilterService, DatePipe, EditService, ToolbarService, CommandColumnService],
  bootstrap: [AppComponent]
})
export class AppModule { }
