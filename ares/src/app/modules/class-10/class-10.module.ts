import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Class10RoutingModule } from './class-10-routing.module';
import { Class10HomeComponent } from './components/class10-home/class10-home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { Class10CadastrarContractComponent } from './components/class10-cadastrar-contract/class10-cadastrar-contract.component';
import { Class10IndexComponent } from './components/class10-index/class10-index.component';


@NgModule({
  declarations: [Class10HomeComponent, Class10CadastrarContractComponent, Class10IndexComponent],
  imports: [
    CommonModule,
    Class10RoutingModule,
    SharedModule
  ]
})
export class Class10Module { }
