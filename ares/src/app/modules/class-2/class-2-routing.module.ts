import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Class2HomeComponent } from './components/class2-home/class2-home.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/users/private/class2/root',
    pathMatch: 'full'
  },
  {
    path: 'root',
    component: Class2HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Class2RoutingModule { }
