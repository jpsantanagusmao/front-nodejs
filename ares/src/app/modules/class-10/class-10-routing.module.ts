import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth-guard.service';
import { Class10HomeComponent } from './components/class10-home/class10-home.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/users/private/class10/root',
    pathMatch: 'full'
  },
  {
    path: 'root',
    component: Class10HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Class10RoutingModule { }
