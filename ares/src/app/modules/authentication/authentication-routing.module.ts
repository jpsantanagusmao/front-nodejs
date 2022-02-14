import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrivatedComponent } from './components/privated/privated.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/users/private/class0/root',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'private',
    component: PrivatedComponent,
    children:[
      {
        path: '',
        redirectTo: '/private/class0/root',
        pathMatch: 'full'
      },
      {
        path: 'class0',
        loadChildren: () => import('../class-0/class-0.module').then(m => m.Class0Module)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
