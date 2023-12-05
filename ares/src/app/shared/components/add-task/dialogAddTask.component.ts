import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { AlertMessagesService } from '../../services/alert-messages.service';
import { v4 as uuidv4 } from 'uuid';
import { statusModel } from '../../models/status.model';

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './dialog-Add-Task-component.html',
  styleUrls: ['./dialog-Add-Task-component.css']
})
export class DialogAddTaskComponent implements OnInit {

  @Output() onStore = new EventEmitter();
  confirmResult: Subject<any>;

  taskSelected: any;
  userSelected: any;
  task: any;
  id: string = uuidv4();

  @Input() title: string = 'Registro de Serviços a executar';


  hoje: string = moment().format('YYYY-MM-DD');

  form: FormGroup;//Formulario do serviço

  public constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private _messageService: AlertMessagesService
  ) {

    this.form = this.fb.group({
      description: [''],
      qtd: ['1'],
      valor: ['']
    });

  }


  onSelectAction(value) {
    this.form.controls.description.patchValue(value.description);
    this.form.controls.valor.patchValue(value.valorPorAtendimento);

    this.taskSelected = this.form.value;

    //Determina a chave estrangeira 'action_id"
    this.taskSelected.action_id = value.id;

  }

  cleanTaskForm() {
    this.form.controls.description.patchValue('');
    this.form.controls.valor.patchValue('0');
  }

  onRegisterTreatment() {

    this.onStore.emit(this.task);

  }
  ngOnInit(): void {
    this.confirmResult = new Subject();

  }

  onConfirm() {

    this._confirmAndClose(this.task);
  }

  onClose() {
    this._confirmAndClose(undefined);
  }

  onSelectUserDesigned(value) {
    if (value) {
      this.userSelected = value.id;
    }
  }

  onIncludeTask(event) {

    const data = this.form.value;

    const id = this.id;

    if (!this.istaskOk()) return false;

    data.status = statusModel.INICIADA;
    data.action_id = this.taskSelected.action_id;
    data.userDesigned_id = this.userSelected;

    this._confirmAndClose(data);

  }

  istaskOk() {
    /**
     Faz a verificação das variaveis se foram configuradas corretamente e valida o formulário
     *
     */
    const msghead = 'Registros incompletos';

    const description = this.form.controls.description.value;

    if (!description) {
      let msg = 'É preciso especificar uma descrição para o serviço que se pretende executar.';
      this._messageService.handleError(msghead, `${msg}`);
      return false;
    }

    const qtd = this.form.controls.qtd.value;

    if (!qtd) {
      let msg = 'É preciso especificar a quantidade do serviço a ser executado.';
      this._messageService.handleError(msghead, `${msg}`);
      return false;
    }

    const valor = this.form.controls.valor.value;
    alert(valor)
    alert(isNaN(valor))
    alert(Number(valor))
    if ( !(isNaN(valor)) && (Number(valor) <= 0) ) {
      let msg = 'O valor unitário para este serviço deve ser informado.';
      this._messageService.handleError(msghead, `${msg}`);
      return false;
    }

    if (this.userSelected) {
      let msg = 'Você deve informar usuário responsável por este serviço.';
      this._messageService.handleError(msghead, `${msg}`);
      return false;
    }
    return true;
  }

  private _confirmAndClose(value: any) {
    try {
      this.confirmResult.next(value);
    } catch (e) {
      this.confirmResult.next(undefined);
    }

    this.bsModalRef.hide();

  }
}
