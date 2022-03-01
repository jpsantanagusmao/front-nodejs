import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrivatedComponent } from './components/privated/privated.component';
import { AuthGuard } from 'src/app/shared/guards/auth-guard.service';
import { ContractComponent } from 'src/app/shared/components/contract/contract.component';
import { DocumentationComponent } from 'src/app/shared/components/documentation/documentation.component';


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
    children: [
      {
        path: '',
        //redirectTo: '/private/class0/root',
        redirectTo: '/class0',
        pathMatch: 'full'
      },
      {
        path: 'class0',
        canActivate: [AuthGuard],
        data: { role_class: [0] },
        loadChildren: () => import('../class-0/class-0.module').then(m => m.Class0Module)
      },
      {
        path: 'class2',
        canActivate: [AuthGuard],
        data: { role_class: [2] },
        loadChildren: () => import('../class-2/class-2.module').then(m => m.Class2Module)
      },
      {
        path: 'class4',
        canActivate: [AuthGuard],
        data: { role_class: [4] },
        loadChildren: () => import('../class-4/class-4.module').then(m => m.Class4Module)
      },
      {
        path: 'class7',
        canActivate: [AuthGuard],
        data: { role_class: [7] },
        loadChildren: () => import('../class-7/class-7.module').then(m => m.Class7Module)
      },
      {
        path: 'class10',
        canActivate: [AuthGuard],
        data: { role_class: ['10'] },
        loadChildren: () => import('../class-10/class-10.module').then(m => m.Class10Module)
      },
      {
        path: 'contract',
        component: ContractComponent
      },
      {
        path: 'documentation',
        component: DocumentationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
