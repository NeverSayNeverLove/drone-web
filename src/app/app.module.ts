import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { SigninComponent } from './signin/signin.component';
import { UserNewsComponent } from './user-news/user-news.component';
import { UserCalendarComponent } from './user-calendar/user-calendar.component';
import { HeaderComponent } from './user-general/header/header.component';
import { FooterComponent } from './user-general/footer/footer.component';
import { NccCalendarComponent } from './ncc-calendar/ncc-calendar.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { UserDetailNewComponent } from './user-detail-new/user-detail-new.component';
import { UserForumShareComponent } from './user-forum-share/user-forum-share.component';
import { UserForumDetailPostComponent } from './user-forum-detail-post/user-forum-detail-post.component';
import { UserForumTopicListComponent } from './user-forum-topic-list/user-forum-topic-list.component';

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
import { GridModule} from '@syncfusion/ej2-angular-grids';
import { PageService, SortService, FilterService} from '@syncfusion/ej2-angular-grids';
import { UserForumPostsOfTopicComponent } from './user-forum-posts-of-topic/user-forum-posts-of-topic.component';





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
    NccCalendarComponent,
    SignupComponent,
    ForgotPassComponent,
    UserDetailNewComponent,
    UserForumShareComponent,
    UserForumDetailPostComponent,
    UserForumTopicListComponent,
    UserForumPostsOfTopicComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ScheduleModule,
    CalendarAllModule,
    MenuModule,
    ToolbarModule,
    MultiSelectAllModule,
    DropDownButtonModule,
    AccordionModule,
    ButtonModule,
    GridModule,

  ],
  providers: [DayService, WeekService, MonthService, ResizeService, DragAndDropService,
    TimelineMonthService, MonthAgendaService, TimelineViewsService,
    PageService, SortService, FilterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
