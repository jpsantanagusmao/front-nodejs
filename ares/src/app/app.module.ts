import { NgxMaskModule } from 'ngx-mask';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeModule } from './modules/welcome/welcome.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AlertMessagesService } from './shared/services/alert-messages.service';
import { InterceptorService } from './shared/services/interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    WelcomeModule,
    AuthenticationModule,
    SharedModule,

    BrowserAnimationsModule
  ],
  providers: [
    UserCacheService,
    AlertMessagesService,
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
    {
      provide: JWT_OPTIONS,
      useValue: JWT_OPTIONS
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
