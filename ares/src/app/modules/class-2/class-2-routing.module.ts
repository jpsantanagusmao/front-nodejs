import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Class2AnaliseSoloComponent } from './components/ater-analise-solo/ater-analise-solo.component';
import { Class2AterDapAcerbityComponent } from './components/ater-dap-acerbity/ater-dap-acerbity.component';
import { Class2DapQueryComponent } from './components/ater-dap-query/ater-dap-query.component';
import { Class2PerdaDeCargaCalcComponent } from './components/calc-irrigacaocalc-irrigacao/calc-irrigacaocalc-irrigacao.component';
import { Class2CadastrarTreatmentComponent } from './components/class2-cadastrar-treatment/class2-cadastrar-treatment.component';
import { Class2HomeComponent } from './components/class2-home/class2-home.component';
import { Class2ToolsComponent } from './components/class2-tools/class2-tools.component';
import { Class2DimPastagemComponent } from './components/dim-pastagem/dim-pastagem.component';


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
    component: Class2AnaliseSoloComponent
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
    path: 'calc-irrigacao',
    component: Class2PerdaDeCargaCalcComponent
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Class2RoutingModule { }
