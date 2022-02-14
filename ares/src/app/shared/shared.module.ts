import { AlertMessagesService } from './services/alert-messages.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    LoadingComponent,
    AlertModalComponent,
  ],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    AlertModule
  ],
  providers:[
    BsModalService
  ],
  exports:[
    LoadingComponent,
    AlertModalComponent,
  ],
  entryComponents:[
    AlertModalComponent
  ]
})
export class SharedModule { }
