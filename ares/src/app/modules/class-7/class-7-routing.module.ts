import { PointsGenerateComponent } from './../../shared/components/maps/points-generate/points-generate.component';
import { Class7DivisionUpdateComponent } from './components/class7-division-update/class7-division-update.component';
import { Class7DivisionAllComponent } from './components/class7-division-all/class7-division-all.component';
import { Class7CadastrarDivisionComponent } from './components/class7-cadastrar-division/class7-cadastrar-division.component';
import { UserUpdateComponent } from './../../shared/components/user/user-update/user-update.component';
import { Class7UsersAllComponent } from './components/class7-users-all/class7-users-all.component';
import { Class7IndexComponent } from './components/class7-index/class7-index.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Class7CadastrarUsuarioComponent } from './components/class7-cadastrar-usuario/class7-cadastrar-usuario.component';
import { Class7HomeComponent } from './components/class7-home/class7-home.component';
import { TreatmentsByDateComponent } from 'src/app/shared/reports/treatments-by-date/treatments-by-date.component';


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
        path: 'atualizar/:id',
        component: UserUpdateComponent
      },
      {
        path: 'users-all',
        component: Class7UsersAllComponent
      },
      {
        path: 'division-cadastrar',
        component: Class7CadastrarDivisionComponent
      },
      {
        path: 'division-atualizar/:id',
        component: Class7DivisionUpdateComponent
      },
      {
        path: 'find-treatment',
        component: TreatmentsByDateComponent
      },
      {
        path: 'division-all',
        component: Class7DivisionAllComponent
      },
      {
        path: 'map',
        component: PointsGenerateComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Class7RoutingModule { }
