import { Class4CadastrarProjetoComponent } from './components/class4-cadastrar-projeto/class4-cadastrar-projeto.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth-guard.service';
import { Class4CadastrarUsuarioComponent } from './components/class4-cadastrar-usuario/class4-cadastrar-usuario.component';
import { Class4HomeComponent } from './components/class4-home/class4-home.component';
import { Class4UsersAllComponent } from './components/class4-users-all/class4-users-all.component';
import { TreatmentCadastrarComponent } from 'src/app/shared/components/treatment/treatment-cadastrar/treatment-cadastrar.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/users/private/class4/root',
    pathMatch: 'full'
  },
  {
    path: 'root',
    component: Class4HomeComponent
  },
  {
    path: 'cadastrar',
    component: Class4CadastrarUsuarioComponent
  },
  {
    path: 'project',
    component: Class4CadastrarProjetoComponent
  },
  {
    path: 'users-all',
    component: Class4UsersAllComponent
  },
  {
    path: 'service',
    component: TreatmentCadastrarComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Class4RoutingModule { }
 