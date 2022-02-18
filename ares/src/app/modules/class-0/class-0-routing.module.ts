import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth-guard.service';
import { Class0HomeComponent } from './components/class0-home/class0-home.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/users/private/class0/root',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { role_class: ['0'] },
  },
  {
    path: 'root',
    component: Class0HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Class0RoutingModule { }
