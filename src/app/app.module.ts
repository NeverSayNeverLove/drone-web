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
import { MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { CalendarAllModule } from '@syncfusion/ej2-angular-calendars';
import { MenuModule, ToolbarModule } from '@syncfusion/ej2-angular-navigations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    SigninComponent,
    UserCalendarComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ScheduleModule,
    CalendarAllModule,
    MenuModule,
    ToolbarModule,
    MultiSelectAllModule,
    DropDownButtonModule
  ],
  providers: [DayService, WeekService, MonthService, ResizeService, DragAndDropService,
    TimelineMonthService, MonthAgendaService, TimelineViewsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
