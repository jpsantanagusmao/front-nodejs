import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { AlertMessagesService } from '../../services/alert-messages.service';

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './dialog-Add-Task-component.html',
  styleUrls: ['./dialog-Add-Task-component.css']
})
export class DialogAddTaskComponent implements OnInit {

  confirmResult: Subject<any>;

  task: any;

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
      qtd: [''],
      valor: ['']
    });

  }

  onSelectAction($event) {
    alert(JSON.stringify($event))
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

  onSelectUserDesigned(event){
    alert(JSON.stringify(event));

  }

  onIncludeTask(event) {
    alert(JSON.stringify(event));
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
    console.log(qtd);
    
    if (!qtd) {
      let msg = 'É preciso especificar a quantidade do serviço a ser executado.';
      this._messageService.handleError(msghead, `${msg}`);
      return false;
    }

    const valor = this.form.controls.valor.value;
    if ((isNaN(valor)) || Number(valor) == 0) {
      let msg = 'O valor unitário para este serviço deve ser informado.';
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
