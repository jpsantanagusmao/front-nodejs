import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Class0RoutingModule } from './class-0-routing.module';
import { Class0HomeComponent } from './components/class0-home/class0-home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { Class0ToolsComponent } from './components/class0-tools/class0-tools.component';


@NgModule({
  declarations: [Class0HomeComponent, Class0ToolsComponent],
  imports: [
    CommonModule,
    Class0RoutingModule,
    SharedModule
  ]
})
export class Class0Module { }
