import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Class10RoutingModule } from './class-10-routing.module';
import { Class10HomeComponent } from './components/class10-home/class10-home.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [Class10HomeComponent],
  imports: [
    CommonModule,
    Class10RoutingModule,
    SharedModule
  ]
})
export class Class10Module { }
