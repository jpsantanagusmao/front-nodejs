import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth-guard.service';
import { Class7HomeComponent } from './components/class7-home/class7-home.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/users/private/class7/root',
    pathMatch: 'full'
  },
  {
    path: 'root',
    component: Class7HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Class7RoutingModule { }
