import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimulacaoSalarioRoutingModule } from './simulacao-salario-routing.module';
import { PanielSimulacaoComponent } from './paniel-simulacao/paniel-simulacao.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PanielSimulacaoComponent 
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SimulacaoSalarioRoutingModule
  ]
})
export class SimulacaoSalarioModule { }
