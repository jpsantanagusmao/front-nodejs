import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Class2RoutingModule } from './class-2-routing.module';
import { Class2HomeComponent } from './components/class2-home/class2-home.component';


@NgModule({
  declarations: [Class2HomeComponent],
  imports: [
    CommonModule,
    Class2RoutingModule
  ]
})
export class Class2Module { }
