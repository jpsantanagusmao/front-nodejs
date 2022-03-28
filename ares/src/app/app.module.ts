import { UserCacheService } from 'src/app/core/user-cache.service';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
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
import { NgxMaskModule } from 'ngx-mask';
import { Class1ToolsComponent } from './modules/class-1/components/class1-tools/class1-tools.component';
import { Class3ToolsComponent } from './modules/class-3/components/class3-tools/class3-tools.component';
import { Class5ToolsComponent } from './modules/class-5/components/class5-tools/class5-tools.component';
import { Class6ToolsComponent } from './modules/class-6/components/class6-tools/class6-tools.component';
import { Class8ToolsComponent } from './modules/class-8/components/class8-tools/class8-tools.component';
import { Class9ToolsComponent } from './modules/class-9/components/class9-tools/class9-tools.component';

@NgModule({
  declarations: [
    AppComponent,
    Class1ToolsComponent,
    Class3ToolsComponent,
    Class5ToolsComponent,
    Class6ToolsComponent,
    Class8ToolsComponent,
    Class9ToolsComponent,
  ],
  imports: [
    BrowserModule,
    NgxMaskModule.forRoot({
      dropSpecialCharacters: true, //ao salvar vai manter a máskara
      showMaskTyped: false
    }),
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
