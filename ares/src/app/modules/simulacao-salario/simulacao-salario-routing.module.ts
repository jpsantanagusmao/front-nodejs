import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanielSimulacaoComponent } from './paniel-simulacao/paniel-simulacao.component';

const routes: Routes = [
  {
    path:'',
    component: PanielSimulacaoComponent,
    children: [
      {
        path: '',
        redirectTo: '/simulacao',
        pathMatch: 'full'
      }
    ]
  }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimulacaoSalarioRoutingModule { }
