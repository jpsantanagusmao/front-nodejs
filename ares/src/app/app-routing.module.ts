import { LogoutComponent } from './shared/components/logout/logout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RPnaeComponent } from './shared/reports/aters/r-pnae/r-pnae.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/welcome/start',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadChildren: () => import('./modules/welcome/welcome.module').then(m => m.WelcomeModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'pnae',
    component: RPnaeComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
