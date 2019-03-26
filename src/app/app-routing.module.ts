import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { UserCalendarComponent } from './user-calendar/user-calendar.component';
import { UserNewsComponent } from './user-news/user-news.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product', component: ProductComponent},
  { path: 'user-calendar', component: UserCalendarComponent},
  { path: 'user-news', component: UserNewsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
