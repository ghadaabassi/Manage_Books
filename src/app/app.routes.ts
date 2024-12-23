import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { ThreeDModelComponent } from '../components/three-dmodel/three-dmodel.component';


export const routes: Routes = [{ path: '', component: HomeComponent },
    { path: 'model', component: ThreeDModelComponent}
];
