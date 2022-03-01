import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { AuthHeaderComponent } from './components/auth-header/auth-header.component';
import { AuthFooterComponent } from './components/auth-footer/auth-footer.component';
import { AuthBodyComponent } from './components/auth-body/auth-body.component';
import { CadastrarDivisionComponent } from './components/division/cadastrar-division/cadastrar-division.component';
import { ContractCadastrarComponent } from './components/contract/contract-cadastrar/contract-cadastrar.component';
import { UserCadastrarComponent } from './components/user/user-cadastrar/user-cadastrar.component';
import { RoleSelectComponent } from './components/role/role-select/role-select.component';
import { DivisionSelectComponent } from './components/division/division-select/division-select.component';
import { UserSelectComponent } from './components/user/user-select/user-select.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserAllComponent } from './components/user/user-all/user-all.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ContractComponent } from './components/contract/contract.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { UserUpdateComponent } from './components/user/user-update/user-update.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    LoadingComponent,
    AlertModalComponent,
    AuthHeaderComponent,
    AuthFooterComponent,
    AuthBodyComponent,
    CadastrarDivisionComponent,
    ContractCadastrarComponent,
    UserCadastrarComponent,
    RoleSelectComponent,
    DivisionSelectComponent,
    UserSelectComponent,
    UserAllComponent,
    LogoutComponent,
    ContractComponent,
    DocumentationComponent,
    UserUpdateComponent,
    ErrorMessageComponent,
  ],
  imports: [
    CommonModule,
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false,
      showMaskTyped: true
    }),
    ModalModule.forRoot(),
    ReactiveFormsModule,
    AlertModule
  ],
  providers:[
    BsModalService
  ],
  exports:[
    LoadingComponent,
    AlertModalComponent,
    AuthHeaderComponent,
    AuthFooterComponent,
    AuthBodyComponent,
    CadastrarDivisionComponent,
    ContractCadastrarComponent,
    UserCadastrarComponent,
    RoleSelectComponent,
    DivisionSelectComponent,
    UserSelectComponent,
    UserAllComponent,
    LogoutComponent,
    ContractComponent,
    DocumentationComponent,
    UserUpdateComponent,
    ErrorMessageComponent,
  ],
  entryComponents:[
    AlertModalComponent
  ]
})
export class SharedModule { }
