import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Class0RoutingModule } from './class-0-routing.module';
import { Class0HomeComponent } from './components/class0-home/class0-home.component';


@NgModule({
  declarations: [Class0HomeComponent],
  imports: [
    CommonModule,
    Class0RoutingModule
  ]
})
export class Class0Module { }
