import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from '../components/alert-modal/alert-modal.component';

@Injectable({
  providedIn: 'root'
})
export class AlertMessagesService {

  constructor(
    private modalService: BsModalService,

  ) { }

  handleSuccess(title, message){
    const type = AlertModalComponent.SUCCESS;
    this._showMessage(title, message, type);
  }

  handleError(title, message){
    const type = AlertModalComponent.DANGER;
    this._showMessage(title, message, type);
  }
  handleInfo(title, message){
    const type = AlertModalComponent.INFO;
    this._showMessage(title, message, type);
  }
  handleWarning(title, message){
    const type = AlertModalComponent.WARNING;
    this._showMessage(title, message, type);
  }
  _showMessage(title, message, type){
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.message = message;
    bsModalRef.content.title = title;
    bsModalRef.content.type = type;

  }
}
