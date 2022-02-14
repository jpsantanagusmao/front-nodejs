import { UserCacheService } from './../../core/user-cache.service';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    AuthenticationRoutingModule
  ],
  providers:[
    UserCacheService,
  ],
  exports:[
    LoginComponent
  ]
})
export class AuthenticationModule { }
