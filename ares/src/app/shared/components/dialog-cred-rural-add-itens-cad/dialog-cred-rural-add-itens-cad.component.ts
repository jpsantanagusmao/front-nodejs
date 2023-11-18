import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { itemfinanciado } from '../../models/cred-rural.model';
import { ITENS_FINANCIAVEIS, Itemfinanciavel } from '../dialog-cred-rural-cad/model/item-financiaveis.model';
import * as moment from 'moment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AlertMessagesService } from '../../services/alert-messages.service';

@Component({
  selector: 'app-dialog-cred-rural-add-itens-cad',
  templateUrl: './dialog-cred-rural-add-itens-cad.component.html',
  styleUrls: ['./dialog-cred-rural-add-itens-cad.component.css']
})
export class DialogCredRuralAddItensCadComponent implements OnInit {
  confirmResult: Subject<any>;

  itemFinanciadoSelected: itemfinanciado;

  ITENS_FINANCIAVEIS_DATA: Itemfinanciavel[] = ITENS_FINANCIAVEIS;

  @Input() title: string = 'Registro de operação de crédito rural';


  hoje: string = moment().format('YYYY-MM-DD');

  form: FormGroup;//formulário do item financiado

  public constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private _messageService: AlertMessagesService
  ) {

    this.form = this.fb.group({
      finalidade: [''],
      qtditemfinanc: [''],
      valorunit: ['']
    });
  }

  multiplica(valor01, valor2) {
    return (Number(valor01) * Number(valor2)).toFixed(2);
  }

  onSelecItemFin(value) {

    // this.onConfirm();
  }

  ngOnInit(): void {
    this.confirmResult = new Subject();
    const obj = this;

  }
  onConfirm() {
    this.itemFinanciadoSelected = {
      finalidade: JSON.parse(this.form.get('finalidade').value).representacaobd,
      atividade: JSON.parse(this.form.get('finalidade').value).atividade,
      descricao: JSON.parse(this.form.get('finalidade').value).descricao,
      unidade: JSON.parse(this.form.get('finalidade').value).unidade,
      qtditemfinanc: Number(this.form.controls.qtditemfinanc.value),
      valorunit: Number(this.form.controls.valorunit.value)
    };
    this._confirmAndClose(this.itemFinanciadoSelected);
  }

  onClose() {
    this._confirmAndClose(undefined);
  }

  formitensok() {

    const msghead = 'Registros incompletos';

    const qtd = this.form.controls.qtditemfinanc.value;
    if ((isNaN(qtd)) || qtd == 0) {
      let msg = 'A quantidade deve ser um número valido e  maior que 0.';
      this._messageService.handleError(msghead, `${msg}`);
      return false;
    }

    const vlunit = this.form.controls.valorunit.value;
    if ((isNaN(vlunit)) || vlunit == 0) {
      let msg = 'O valor do unitário precisa ser um número valido e maior que zero.';
      this._messageService.handleError(msghead, `${msg}`);
      return false;
    }

    const itm = this.form.controls.finalidade.value;

    if (!itm) {
      let msg = 'É preciso especificar qual o item financiado nesta proposta.';
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
