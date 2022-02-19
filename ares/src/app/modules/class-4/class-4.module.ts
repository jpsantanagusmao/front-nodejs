import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Class4RoutingModule } from './class-4-routing.module';
import { Class4HomeComponent } from './components/class4-home/class4-home.component';


@NgModule({
  declarations: [Class4HomeComponent],
  imports: [
    CommonModule,
    Class4RoutingModule
  ]
})
export class Class4Module { }
