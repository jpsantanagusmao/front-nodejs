import { TitulosComponent } from './../../shared/components/ares-data/titulos/titulos.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnaliseSoloComponent } from 'src/app/shared/components/agro/analise-solo/analise-solo.component';
import { ProdHortalicasComponent } from 'src/app/shared/components/agro/prod-hortalicas/prod-hortalicas.component';
import { AgroIndicadoresComponent } from 'src/app/shared/components/indicadores/agro-indicadores/agro-indicadores.component';
import { TreatmentsByDateComponent } from 'src/app/shared/reports/treatments-by-date/treatments-by-date.component';
import { Class2AterDapAcerbityComponent } from './components/ater-dap-acerbity/ater-dap-acerbity.component';
import { Class2DapQueryComponent } from './components/ater-dap-query/ater-dap-query.component';
import { Class2PerdaDeCargaCalcComponent } from './components/calc-irrigacaocalc-irrigacao/calc-irrigacaocalc-irrigacao.component';
import { Class2CadastrarTreatmentComponent } from './components/class2-cadastrar-treatment/class2-cadastrar-treatment.component';
import { Class2HomeComponent } from './components/class2-home/class2-home.component';
import { Class2ToolsComponent } from './components/class2-tools/class2-tools.component';
import { Class2DimPastagemComponent } from './components/dim-pastagem/dim-pastagem.component';
import { RAterRecomenderComponent } from 'src/app/shared/components/ares-data/r-ater-recomender/r-ater-recomender.component';
import { FindCarComponent } from 'src/app/shared/components/car/find-car/find-car.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/users/private/class2/root',
    pathMatch: 'full'
  },
  {
    path: 'root',
    component: Class2HomeComponent
  },
  {
    path: 'tools',
    component: Class2ToolsComponent
  },
  {
    path: 'service',
    component: Class2CadastrarTreatmentComponent
  },
  {
    path: 'ater-analise-solo',
    component: AnaliseSoloComponent
  }, 
  {
    path: 'dim-pastagem',
    component: Class2DimPastagemComponent
  },
  {
    path: 'ater-dap-acerbity',
    component: Class2AterDapAcerbityComponent
  },
  {
    path: 'ater-dap-query',
    component: Class2DapQueryComponent
  }, 
  {
    path: 'prod-hortalicas',
    component: ProdHortalicasComponent
  },
  {
    path: 'calc-irrigacao',
    component: Class2PerdaDeCargaCalcComponent
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
export class Class2RoutingModule { }
