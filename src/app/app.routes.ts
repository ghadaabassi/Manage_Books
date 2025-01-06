import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { ThreeDModelComponent } from '../components/three-dmodel/three-dmodel.component';
import { FreeBooksComponent } from '../components/free-books/free-books.component';
import { BookRecommenderComponent } from '../components/book-recommender/book-recommender.component';
import { AboutUsComponent } from '../components/about-us/about-us.component';
import { SignInComponent } from '../components/authentication/sign-in/sign-in.component';
import { SignUpComponent } from '../components/authentication/sign-up/sign-up.component';
import { NotfoundComponent } from '../components/notfound/notfound.component';
import { UserAccountComponent } from '../components/user-account/user-account.component';
import { CartComponent } from '../components/cart/cart.component';
import { OrderComponent } from '../components/order/order.component';

import { roleGuard } from '../guards/role.guard';
import { BookManagementComponent } from '../components/admin/book-management/book-management.component';
import { AdminOrdersComponent } from '../components/admin-orders/admin-orders.component';
import { ClientOrdersComponent } from '../components/client-orders/client-orders.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'model', component: ThreeDModelComponent },
  { path: 'free', component: FreeBooksComponent },
  {
    path: 'recommender',
    component: BookRecommenderComponent,
    canActivate: [roleGuard],
    data: { role: 'Reader' },
  },
  { path: 'aboutUs', component: AboutUsComponent },
  { path: 'signIn', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'cart', component: CartComponent },
  { path: 'order', component: OrderComponent },
  { path: 'account', component: UserAccountComponent },
  { path: 'book-management', component: BookManagementComponent },
  { path: 'order-management', component: AdminOrdersComponent },
  { path: 'view-orders', component: ClientOrdersComponent },
  { path: '**', component: NotfoundComponent },
];
