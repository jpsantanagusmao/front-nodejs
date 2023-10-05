import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimulacaoSalarioRoutingModule } from './simulacao-salario-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PanielSimulacaoComponent } from './paniel-simulacao/paniel-simulacao.component';



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
