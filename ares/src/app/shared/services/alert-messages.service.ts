import { DialogRaterComponent } from './../components/dialog-rater/dialog-rater.component';
import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from '../components/alert-modal/alert-modal.component';
import { DialogConfirmComponent } from '../components/dialog-confirm/dialog-confirm.component';

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

  /**
   * 
   * @param title titulo da caixa de confirmação
   * @param confirmMessage mensagem de confiração
   * @param confirmText opcional texto do botõ de confirmação
   * @param cancelTxt opcional texto do botão de cancelar
   */
  showConfirm(title: string, confirmMessage:string, confirmText?: string, cancelTxt?: string){
    const bsModalRef: BsModalRef = this.modalService.show(DialogConfirmComponent);
    bsModalRef.content.title = title;
    bsModalRef.content.confirmMessage = confirmMessage;
    
    if(confirmText){
      bsModalRef.content.confirmText = confirmText;
    }

    if(cancelTxt){
      bsModalRef.content.cancelTxt = cancelTxt;
    }

    return (<DialogConfirmComponent>bsModalRef.content).confirmResult;
  }

  /**
   * 
   * @param situacao 
   * @param orientacao 
   * @param recomendacao 
   * @returns 
   */
  showRaterConfirm(situacao: string, orientacao:string, recomendacao: string){
    const bsModalRef: BsModalRef = this.modalService.show(DialogRaterComponent, { class: 'modal-lg' });
    bsModalRef.content.situacaoTxt = situacao;
    bsModalRef.content.orientacaoTxt = orientacao;
    bsModalRef.content.recomendacaoTxt = recomendacao;
    
    return (<DialogRaterComponent>bsModalRef.content).confirmResult;
  }
}
