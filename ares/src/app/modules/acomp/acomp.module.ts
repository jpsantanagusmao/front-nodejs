import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { AcompRoutingModule } from './acomp-routing.module';
import { TelaAcompComponent } from './components/tela-acomp/tela-acomp.component';
import { PropriedadeRuralComponent } from './components/propriedade-rural/propriedade-rural.component';
import { ContatoFuncionarioComponent } from './components/contato-funcionario/contato-funcionario.component';
import { ReactiveFormsModule } from '@angular/forms';

import localePT from '@angular/common/locales/pt';

registerLocaleData(localePT);

@NgModule({
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-br' },
   ],
  declarations: [TelaAcompComponent, PropriedadeRuralComponent, ContatoFuncionarioComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AcompRoutingModule
  ]
})
export class AcompModule { }
