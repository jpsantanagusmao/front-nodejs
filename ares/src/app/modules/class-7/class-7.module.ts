import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Class7RoutingModule } from './class-7-routing.module';
import { Class7HomeComponent } from './components/class7-home/class7-home.component';


@NgModule({
  declarations: [Class7HomeComponent],
  imports: [
    CommonModule,
    Class7RoutingModule
  ]
})
export class Class7Module { }
