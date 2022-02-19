import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PastagemDimComponent } from './components/pastagem-dim/pastagem-dim.component';
import { DapConsultaComponent } from './components/dap-consulta/dap-consulta.component';
import { PerdaDeCargaCalcComponent } from './components/perda-de-carga-calc/perda-de-carga-calc.component';
import { SilagemDimComponent } from './components/silagem-dim/silagem-dim.component';



@NgModule({
  declarations: [PastagemDimComponent, DapConsultaComponent, PerdaDeCargaCalcComponent, SilagemDimComponent],
  imports: [
    CommonModule
  ]
})
export class AgroModule { }
