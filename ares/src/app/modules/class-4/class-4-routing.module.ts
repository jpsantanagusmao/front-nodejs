import { RaterComponent } from './../../shared/components/reports/rater/rater.component';
import { Class4CadastrarProjetoComponent } from './components/class4-cadastrar-projeto/class4-cadastrar-projeto.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth-guard.service';
import { Class4CadastrarUsuarioComponent } from './components/class4-cadastrar-usuario/class4-cadastrar-usuario.component';
import { Class4HomeComponent } from './components/class4-home/class4-home.component';
import { Class4UsersAllComponent } from './components/class4-users-all/class4-users-all.component';
import { TreatmentCadastrarComponent } from 'src/app/shared/components/treatment/treatment-cadastrar/treatment-cadastrar.component';
import { Class4CadastrarTreatmentComponent } from './components/class4-cadastrar-treatment/class4-cadastrar-treatment.component';
import { AnaliseSoloComponent } from 'src/app/shared/components/agro/analise-solo/analise-solo.component';
import { DapWebComponent } from 'src/app/shared/components/dap-mda/dap-web/dap-web.component';
import { Class4DapQueryComponent } from './components/class4-dap-query/class4-dap-query.component';
import { Class4DapAcerbityComponent } from './components/class4-dap-acerbity/class4-dap-acerbity.component';
import { Class4PerdaDeCargaCalcComponent } from './components/class4-perda-de-carga-calc/class4-perda-de-carga-calc.component';


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
    component: Class4CadastrarTreatmentComponent
  },
  {
    path: 'ater-analise-solo',
    component: AnaliseSoloComponent
  },
  {
    path: 'ater-dap-acerbity',
    component: Class4DapAcerbityComponent
  },
  {
    path: 'ater-dap-query',
    component: Class4DapQueryComponent
  },
  {
    path: 'rater',
    component: RaterComponent
  },
  {
    path: 'calc-irrigacao',
    component: Class4PerdaDeCargaCalcComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Class4RoutingModule { }
 