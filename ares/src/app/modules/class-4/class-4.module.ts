import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Class4RoutingModule } from './class-4-routing.module';
import { Class4HomeComponent } from './components/class4-home/class4-home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { Class4CadastrarUsuarioComponent } from './components/class4-cadastrar-usuario/class4-cadastrar-usuario.component';
import { Class4CadastrarProjetoComponent } from './components/class4-cadastrar-projeto/class4-cadastrar-projeto.component';
import { Class4UsersAllComponent } from './components/class4-users-all/class4-users-all.component';
import { Class4CadastrarTreatmentComponent } from './components/class4-cadastrar-treatment/class4-cadastrar-treatment.component';
import { Class4DapQueryComponent } from './components/class4-dap-query/class4-dap-query.component';
import { Class4DapAcerbityComponent } from './components/class4-dap-acerbity/class4-dap-acerbity.component';
import { Class4PerdaDeCargaCalcComponent } from './components/class4-perda-de-carga-calc/class4-perda-de-carga-calc.component';
import { Class4DimPastagemComponent } from './components/class4-dim-pastagem/class4-dim-pastagem.component';
import { Class4DimCapineiraComponent } from './components/class4-dim-capineira/class4-dim-capineira.component';
import { Class4AnaliseSoloComponent } from './components/class4-analise-solo/class4-analise-solo.component';
import { Class4ToolsComponent } from './components/class4-tools/class4-tools.component';
import { Clas4ProdHortalicasComponent } from './components/clas4-prod-hortalicas/clas4-prod-hortalicas.component';
import { Class4InfracoesConsultaComponent } from './components/class4-infracoes-consulta/class4-infracoes-consulta.component';
import { DimEsterqueiraComponent } from './components/dim-esterqueira/dim-esterqueira.component';
import { Class4ProjetoRegionalComponent } from './components/class4-projeto-regional/class4-projeto-regional.component';


@NgModule({
  declarations: [Class4HomeComponent, Class4CadastrarUsuarioComponent, Class4CadastrarProjetoComponent, Class4UsersAllComponent, Class4CadastrarTreatmentComponent, Class4DapQueryComponent, Class4DapAcerbityComponent, Class4PerdaDeCargaCalcComponent, Class4DimPastagemComponent, Class4DimCapineiraComponent, Class4AnaliseSoloComponent, Class4ToolsComponent, Clas4ProdHortalicasComponent, Class4InfracoesConsultaComponent, DimEsterqueiraComponent, Class4ProjetoRegionalComponent],
  imports: [
    CommonModule,
    Class4RoutingModule,
    SharedModule
  ]
})
export class Class4Module { }
