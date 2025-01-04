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
import { MapComponent } from '../components/map/map.component';
import { roleGuard } from '../guards/role.guard';

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
  { path: 'account', component: UserAccountComponent },
  { path: 'map', component: MapComponent },
  { path: '**', component: NotfoundComponent },
];
