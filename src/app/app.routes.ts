import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { ThreeDModelComponent } from '../components/three-dmodel/three-dmodel.component';
import { FreeBooksComponent } from '../components/free-books/free-books.component';
import { BookRecommenderComponent } from '../components/book-recommender/book-recommender.component';
import { AboutUsComponent } from '../components/about-us/about-us.component';
import { SignInComponent } from '../components/authentication/sign-in/sign-in.component';
import { SignUpComponent } from '../components/authentication/sign-up/sign-up.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'model', component: ThreeDModelComponent },
  { path: 'free', component: FreeBooksComponent },
  { path: 'recommender', component: BookRecommenderComponent },
  { path: 'aboutUs', component: AboutUsComponent },
  { path: 'SignIn', component: SignInComponent },
  { path: 'SignUp', component: SignUpComponent },
];
