import { UserCacheService } from './../../core/user-cache.service';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './components/login/login.component';
import { PrivatedComponent } from './components/privated/privated.component';
import { Class0Module } from '../class-0/class-0.module';
import { DetailsComponent } from 'src/app/shared/components/details/details.component';

@NgModule({
  declarations: [
    LoginComponent,
    PrivatedComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    Class0Module,
    AuthenticationRoutingModule
  ],
  providers:[
    UserCacheService,
  ],
  exports:[
    LoginComponent,
    DetailsComponent
  ]
})
export class AuthenticationModule { }
