import { DialogCredRuralCadComponent } from './../components/dialog-cred-rural-cad/dialog-cred-rural-cad.component';
import { DialogRaterComponent } from './../components/dialog-rater/dialog-rater.component';
import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from '../components/alert-modal/alert-modal.component';
import { DialogConfirmComponent } from '../components/dialog-confirm/dialog-confirm.component';
import { PointsGenerateComponent } from '../components/maps/points-generate/points-generate.component';
import { DialogCommentsComponent } from '../components/dialog-comments/dialog-comments.component';
import { DialogProdLeiteCadComponent } from '../components/dialog-prod-leite-cad/dialog-prod-leite-cad.component';
import { DialogAgroindustriaCadComponent } from '../components/dialog-agroindustria-cad/dialog-agroindustria-cad.component';
import { DialogAddTaskComponent } from '../components/add-task/dialogAddTask.component';
import { DialogCredRuralAddItensCadComponent } from '../components/dialog-cred-rural-add-itens-cad/dialog-cred-rural-add-itens-cad.component';
import { DialogDaeValueComponent } from '../components/dialog-dae-value/dialog-dae-value.component';

@Injectable({
  providedIn: 'root'
})
export class AlertMessagesService {

  constructor(
    private modalService: BsModalService,
  ) { }

  handleSuccess(title, message) {
    const type = AlertModalComponent.SUCCESS;
    this._showMessage(title, message, type);
  }

  handleError(title, message) {
    const type = AlertModalComponent.DANGER;
    this._showMessage(title, message, type);
  }
  handleInfo(title, message) {
    const type = AlertModalComponent.INFO;
    this._showMessage(title, message, type);
  }
  handleWarning(title, message) {
    const type = AlertModalComponent.WARNING;
    this._showMessage(title, message, type);
  }
  _showMessage(title, message, type) {
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
  showConfirm(title: string, confirmMessage: string, confirmText?: string, cancelTxt?: string) {
    const bsModalRef: BsModalRef = this.modalService.show(DialogConfirmComponent);
    bsModalRef.content.title = title;
    bsModalRef.content.confirmMessage = confirmMessage;

    if (confirmText) {
      bsModalRef.content.confirmText = confirmText;
    }

    if (cancelTxt) {
      bsModalRef.content.cancelTxt = cancelTxt;
    }

    return (<DialogConfirmComponent>bsModalRef.content).confirmResult;
  }

  showInput(title: string, message: string, confirmText?: string, cancelTxt?: string, valor?: Number) {
    const bsModalRef: BsModalRef = this.modalService.show(DialogDaeValueComponent);

    bsModalRef.content.title = title;
    bsModalRef.content.message = message;

    if (valor) {
      bsModalRef.content.valorgpm = valor.toFixed(2);
    }

    if (confirmText) {
      bsModalRef.content.confirmText = confirmText;
    }

    if (cancelTxt) {
      bsModalRef.content.cancelTxt = cancelTxt;
    }

    return (<DialogDaeValueComponent>bsModalRef.content).confirmResult;

  }

  /**
   *
   * @param situacao
   * @param orientacao
   * @param recomendacao
   * @returns
   */
  showRaterConfirm(situacao: string, orientacao: string, recomendacao: string, origin: string) {
    const bsModalRef: BsModalRef = this.modalService.show(DialogRaterComponent, { class: 'modal-lg' });
    bsModalRef.content.situacaoTxt = situacao;
    bsModalRef.content.orientacaoTxt = orientacao;
    bsModalRef.content.recomendacaoTxt = recomendacao;
    bsModalRef.content.origin = origin;

    return (<DialogRaterComponent>bsModalRef.content).confirmResult;
  }

  /**
   *
   * @param idTask id da tarefa
   * @param task texto da tarefa
   * @param beneficiario beneficiario desta tarefa
   * @returns
   */
  showSendComment(idTask: string, task: string, beneficiario: string) {
    const bsModalRef: BsModalRef = this.modalService.show(DialogCommentsComponent, { class: 'modal-lg' });
    bsModalRef.content.idTask = idTask;
    bsModalRef.content.task = task;
    bsModalRef.content.beneficiario = beneficiario;
    return (<DialogRaterComponent>bsModalRef.content).confirmResult;
  }

  showPointSelect() {

    const bsModalRef: BsModalRef = this.modalService.show(PointsGenerateComponent, { class: 'modal-lg' });

    return (<PointsGenerateComponent>bsModalRef.content).confirmResult;

  }
  showRegCredRural() {

    const bsModalRef: BsModalRef = this.modalService.show(DialogCredRuralCadComponent, { class: 'modal-xl' });

    return (<DialogProdLeiteCadComponent>bsModalRef.content).confirmResult;

  }
  showDialgAddItensFinance() {

    const bsModalRef: BsModalRef = this.modalService.show(DialogCredRuralAddItensCadComponent, { class: 'modal-xl' });

    return (<DialogAddTaskComponent>bsModalRef.content).confirmResult;

  }
  showDialgoAddTask() {

    const bsModalRef: BsModalRef = this.modalService.show(DialogAddTaskComponent, { class: 'modal-xl' });

    return (<DialogAddTaskComponent>bsModalRef.content).confirmResult;

  }
  showRegAgroindustria() {

    const bsModalRef: BsModalRef = this.modalService.show(DialogAgroindustriaCadComponent, { class: 'modal-xl' });

    return (<DialogAgroindustriaCadComponent>bsModalRef.content).confirmResult;

  }
  showRegProdLeite() {

    const bsModalRef: BsModalRef = this.modalService.show(DialogProdLeiteCadComponent, { class: 'modal-xl' });

    return (<DialogProdLeiteCadComponent>bsModalRef.content).confirmResult;

  }
}
