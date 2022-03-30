import { AuthenticationModule } from './../authentication/authentication.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { IndexComponent } from './components/index/index.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    AuthenticationModule,
    WelcomeRoutingModule,
    SharedModule
  ],
  providers:[
  ]
})
export class WelcomeModule { }
