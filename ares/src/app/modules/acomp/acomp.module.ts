import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcompRoutingModule } from './acomp-routing.module';
import { TelaAcompComponent } from './components/tela-acomp/tela-acomp.component';
import { PropriedadeRuralComponent } from './components/propriedade-rural/propriedade-rural.component';
import { ContatoFuncionarioComponent } from './components/contato-funcionario/contato-funcionario.component';


@NgModule({
  declarations: [TelaAcompComponent, PropriedadeRuralComponent, ContatoFuncionarioComponent],
  imports: [
    CommonModule,
    AcompRoutingModule
  ]
})
export class AcompModule { }
