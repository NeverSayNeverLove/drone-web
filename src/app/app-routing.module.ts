import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { UserCalendarComponent } from './user-calendar/user-calendar.component';
import { UserNewsComponent } from './user-news/user-news.component';
import { NccCalendarComponent } from './ncc-calendar/ncc-calendar.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { UserDetailNewComponent } from './user-detail-new/user-detail-new.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product', component: ProductComponent},
  { path: 'user-calendar', component: UserCalendarComponent},
  { path: 'user-news', component: UserNewsComponent},
  { path: 'user-detail-new', component: UserDetailNewComponent},
  { path: 'ncc-calendar', component: NccCalendarComponent},
  { path: 'signin', component: SigninComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'forgotpass', component: ForgotPassComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
