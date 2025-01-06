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
import { BookCollectionComponent } from '../components/book-collection/book-collection.component';
import { PuzzleComponent } from '../components/puzzle/puzzle.component';

import { roleGuard } from '../guards/role.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'model',
    component: ThreeDModelComponent,
  },
  {
    path: 'collection',
    component: BookCollectionComponent,
    canActivate: [roleGuard],
    data: { role: 'AuthenticatedUser' },
  },
  { path: 'quiz', component: PuzzleComponent },

  {
    path: 'free',
    component: FreeBooksComponent,
    canActivate: [roleGuard],
    data: { role: 'Premium' },
  },
  {
    path: 'recommender',
    component: BookRecommenderComponent,
    canActivate: [roleGuard],
    data: { role: 'AuthenticatedUser' },
  },
  { path: 'aboutUs', component: AboutUsComponent },
  { path: 'signIn', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  {
    path: 'account',
    component: UserAccountComponent,
    canActivate: [roleGuard],
    data: { role: 'AuthenticatedUser' },
  },
  { path: 'map', component: MapComponent },
  { path: '**', component: NotfoundComponent },
];
