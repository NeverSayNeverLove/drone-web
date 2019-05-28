import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './Shop/product/product.component';
import { UserCalendarComponent } from './Calendar/user-calendar/user-calendar.component';
import { UserNewsComponent } from './Forum/user-news/user-news.component';
import { SigninComponent } from './Oauth/signin/signin.component';
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
import { AdminUsermanagementComponent } from './admin-usermanagement/admin-usermanagement.component';
import { ContactComponent } from './contact/contact.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product', component: ProductComponent},
  { path: 'user-calendar', component: UserCalendarComponent},
  { path: 'user-news', component: UserNewsComponent},
  { path: 'user-detail-new', component: UserDetailNewComponent},
  { path: 'user-forum-share', component: UserForumShareComponent},
  { path: 'user-forum-detail-post', component: UserForumDetailPostComponent},
  { path: 'user-forum-topic-list', component: UserForumTopicListComponent},
  { path: 'user-forum-posts-of-topic', component: UserForumPostsOfTopicComponent},
  { path: 'signin', component: SigninComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'forgotpass', component: ForgotPassComponent},
  { path: 'user-product-list', component: UserProductListComponent},
  { path: 'user-detail-product/:productID', component: UserDetailProductComponent},
  { path: 'user-cart', component: UserCartComponent},
  { path: 'user-detail-bill/:id', component: UserDetailBillComponent},
  { path: 'user-detail-bill', component: UserDetailBillComponent},
  { path: 'user-order-history', component: UserOrderHistoryComponent},
  { path: 'sup-add-product', component: SupAddProductComponent},
  { path: 'admin-usermanagement', component: AdminUsermanagementComponent},
  { path: 'contact', component: ContactComponent},







];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
