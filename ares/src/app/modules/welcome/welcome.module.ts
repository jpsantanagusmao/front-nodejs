import { SharedModule } from './../../shared/shared.module';
import { AuthenticationModule } from './../authentication/authentication.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { IndexComponent } from './components/index/index.component';

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    AuthenticationModule,
    WelcomeRoutingModule
  ],
  providers:[
  ]
})
export class WelcomeModule { }
