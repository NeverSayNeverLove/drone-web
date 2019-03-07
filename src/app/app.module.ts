import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { SigninComponent } from './signin/signin.component';
// user
import { UserCalendarComponent } from './user-calendar/user-calendar.component';
import { HeaderComponent } from './user-general/header/header.component';

// syncfusion
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import {
    TimelineViewsService, TimelineMonthService, MonthAgendaService,
    DayService, WeekService, MonthService, ResizeService, DragAndDropService
} from '@syncfusion/ej2-angular-schedule';
import { MultiSelectComponent } from '@syncfusion/ej2-angular-dropdowns';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    SigninComponent,
    UserCalendarComponent,
    HeaderComponent,
    MultiSelectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ScheduleModule,
  ],
  providers: [DayService, WeekService, MonthService, ResizeService, DragAndDropService,
    TimelineMonthService, MonthAgendaService, TimelineViewsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
