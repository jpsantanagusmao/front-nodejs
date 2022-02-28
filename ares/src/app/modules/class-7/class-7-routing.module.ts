import { Class7UsersAllComponent } from './components/class7-users-all/class7-users-all.component';
import { Class7IndexComponent } from './components/class7-index/class7-index.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Class7CadastrarUsuarioComponent } from './components/class7-cadastrar-usuario/class7-cadastrar-usuario.component';
import { Class7HomeComponent } from './components/class7-home/class7-home.component';


const routes: Routes = [
  {
    path: '',
    component: Class7IndexComponent,
    children: [
      {
        path: '',
        redirectTo: '/users/private/class7/root',
        pathMatch: 'full'

      },
      {
        path: 'root',
        component: Class7HomeComponent
      },
      {
        path: 'cadastrar',
        component: Class7CadastrarUsuarioComponent
      },
      {
        path: 'users-all',
        component: Class7UsersAllComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Class7RoutingModule { }
