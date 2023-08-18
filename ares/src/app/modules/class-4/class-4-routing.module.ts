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
import { Class4ToolsComponent } from './components/class4-tools/class4-tools.component';
import { Class4DimPastagemComponent } from './components/class4-dim-pastagem/class4-dim-pastagem.component';
import { ProdHortalicasComponent } from 'src/app/shared/components/agro/prod-hortalicas/prod-hortalicas.component';
import { AgroIndicadoresComponent } from 'src/app/shared/components/indicadores/agro-indicadores/agro-indicadores.component';
import { TreatmentsByDateComponent } from 'src/app/shared/reports/treatments-by-date/treatments-by-date.component';
import { TitulosComponent } from 'src/app/shared/components/ares-data/titulos/titulos.component';
import { RAterRecomenderComponent } from 'src/app/shared/components/ares-data/r-ater-recomender/r-ater-recomender.component';
import { FindCarComponent } from 'src/app/shared/components/car/find-car/find-car.component';
import { Pnae2023RaterComponent } from 'src/app/shared/components/reports/rater/pnae2023-rater/pnae2023-rater.component';


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
    path: 'print-rater',
    component: RaterComponent
  },
  {
    path: 'print-rater-pnae',
    component: Pnae2023RaterComponent
  },
  {
    path: 'calc-irrigacao',
    component: Class4PerdaDeCargaCalcComponent
  },
  {
    path: 'dim-pastagem',
    component: Class4DimPastagemComponent
  },
  {
    path: 'prod-hortalicas',
    component: ProdHortalicasComponent
  },
  {
    path: 'tools',
    component: Class4ToolsComponent
  },
  {
    path: 'find-treatment',
    component: TreatmentsByDateComponent
  },
  {
    path: 'indicadores',
    component: AgroIndicadoresComponent
  },
  {
    path: 'rater',
    component: RAterRecomenderComponent
  },
  {
    path: 'find-car',
    component: FindCarComponent
  },
  {
    path: 'titulos',
    component: TitulosComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Class4RoutingModule { }
 