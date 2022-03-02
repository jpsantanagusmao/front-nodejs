import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Class7RoutingModule } from './class-7-routing.module';
import { Class7HomeComponent } from './components/class7-home/class7-home.component';
import { Class7CadastrarUsuarioComponent } from './components/class7-cadastrar-usuario/class7-cadastrar-usuario.component';
import { Class7MenuComponent } from './components/class7-menu/class7-menu.component';
import { Class7IndexComponent } from './components/class7-index/class7-index.component';
import { Class7UsersAllComponent } from './components/class7-users-all/class7-users-all.component';
import { Class7CadastrarDivisionComponent } from './components/class7-cadastrar-division/class7-cadastrar-division.component';
import { Class7DivisionAllComponent } from './components/class7-division-all/class7-division-all.component';
import { Class7DivisionUpdateComponent } from './components/class7-division-update/class7-division-update.component';


@NgModule({
  declarations: [Class7HomeComponent, Class7CadastrarUsuarioComponent, Class7MenuComponent, Class7IndexComponent, Class7UsersAllComponent, Class7CadastrarDivisionComponent, Class7DivisionAllComponent, Class7DivisionUpdateComponent],
  imports: [
    CommonModule,
    Class7RoutingModule,
    SharedModule
  ]
})
export class Class7Module { }
