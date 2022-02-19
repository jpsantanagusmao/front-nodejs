import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth-guard.service';
import { Class4HomeComponent } from './components/class4-home/class4-home.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/users/private/class4/root',
    pathMatch: 'full'
  },
  {
    path: 'root',
    component: Class4HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Class4RoutingModule { }
