import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CredRuralModel, itemfinanciado } from '../../models/cred-rural.model';
import * as moment from 'moment';
import { Itemfinanciavel, ITENS_FINANCIAVEIS } from './model/item-financiaveis.model';
import { Banco, BANCO_FINANCIADOR } from './model/banco-financiador.model';
import { LinhaCredito, LINHA_CREDITO } from './model/linha-credito.model';
import { AlertMessagesService } from '../../services/alert-messages.service';

@Component({
  selector: 'app-dialog-cred-rural-cad',
  templateUrl: './dialog-cred-rural-cad.component.html',
  styleUrls: ['./dialog-cred-rural-cad.component.css']
})
export class DialogCredRuralCadComponent implements OnInit {
  confirmResult: Subject<CredRuralModel>;

  propostacred: CredRuralModel;
  itensFinanciados: any[] = [];
  itemFinanciadoSelected: any;

  ITENS_FINANCIAVEIS_DATA: Itemfinanciavel[] = ITENS_FINANCIAVEIS;
  BANCO_FINANCIADOR_DATA: Banco[] = BANCO_FINANCIADOR;
  LINHA_CREDITO_DATA: LinhaCredito[] = LINHA_CREDITO;

  @Input() title: string = 'Registro de operação de crédito rural';


  hoje: string = moment().format('YYYY-MM-DD');

  formprop: FormGroup;//Formulario da proposta
  formitem: FormGroup;//formulário do item financiado

  public constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private _messageService: AlertMessagesService
  ) {

    this.formprop = this.fb.group({
      banco: [''],
      linha: [''],
      anoprimpgm: [''],
      anoultpgm: [''],
      txjurosaa: [''],
    });


    this.formitem = this.fb.group({
      finalidade: [''],
      qtditemfinanc: [''],
      valorunit: ['']
    });
  }

  async onAddNewItem() {

    if (!this.formitensok()) {
      return;
    }

    this.itemFinanciadoSelected.qtditemfinanc = Number(this.formitem.get('qtditemfinanc').value),
      this.itemFinanciadoSelected.valorunit = Number(this.formitem.get('valorunit').value)
    this.itensFinanciados.push(this.itemFinanciadoSelected);
  }

  multiplica(valor01, valor2) {
    return (Number(valor01) * Number(valor2)).toFixed(2);
  }

  get total() {
    if (this.itensFinanciados.length > 0) {
      return this.itensFinanciados.map(function (item) {
        return Number(Number(item.qtditemfinanc) * Number(item.valorunit)).toFixed(2);
      }).reduce(function (previousValue, currentValue) {
        return Number(Number(previousValue) + Number(currentValue)).toFixed(2);
      });
    }
    return 0;
  }

  onSelecItemFin(value) {
    // this.itemFinanciadoSelected = {
    //   finalidade: JSON.parse(this.formitem.get('finalidade').value).representacaobd,
    //   atividade: JSON.parse(this.formitem.get('finalidade').value).atividade,
    //   descricao: JSON.parse(this.formitem.get('finalidade').value).descricao,
    //   unidade: JSON.parse(this.formitem.get('finalidade').value).unidade,
    //   qtditemfinanc: Number(this.formitem.get('qtditemfinanc').value),
    //   valorunit: Number(this.formitem.get('valorunit').value)
    // };

    if (!this.itemFinanciadoSelected) return false;

    this.itemFinanciadoSelected.qtditemfinanc = Number(this.formitem.controls.qtditemfinanc.value);
    this.itemFinanciadoSelected.valorunit = Number(this.formitem.controls.valorunit.value);
    // ...AlertMessagesService.    this.itemFinanciadoSelected.finalidade = this.itemFinanciadoSelected.atividade;

    this.itemFinanciadoSelected.finalidade = this.itemFinanciadoSelected.representacaobd;

    // delete this.itemFinanciadoSelected.atividade;

    delete this.itemFinanciadoSelected.created;
    delete this.itemFinanciadoSelected.createdby;
    delete this.itemFinanciadoSelected.updated;
    delete this.itemFinanciadoSelected.updatedby;

    this._confirmAndClose(this.itemFinanciadoSelected);
  }

  ngOnInit(): void {
    this.confirmResult = new Subject();
    const obj = this;

  }
  onConfirm() {
    const obj = this;



    this.propostacred = this.formprop.value;
    this.propostacred.itens = this.itensFinanciados;
    if (!this.formPropostaok(this.propostacred)) {
      return;
    }
    this._confirmAndClose(this.propostacred);
  }

  onClose() {
    this._confirmAndClose(undefined);
  }
  onRemove() {
    this.itensFinanciados = [];
  }

  onSelectItem(value) {
    // alert(JSON.stringify(value));
    this.itemFinanciadoSelected = value;

  }

  formitensok() {

    const msghead = 'Registros incompletos';

    const qtd = this.formitem.controls.qtditemfinanc.value;
    if ((isNaN(qtd)) || qtd == 0) {
      let msg = 'A quantidade deve ser um número valido e  maior que 0.';
      this._messageService.handleError(msghead, `${msg}`);
      return false;
    }

    const vlunit = this.formitem.controls.valorunit.value;
    if ((isNaN(vlunit)) || vlunit == 0) {
      let msg = 'O valor do unitário precisa ser um número valido e maior que zero.';
      this._messageService.handleError(msghead, `${msg}`);
      return false;
    }

    const itm = this.itemFinanciadoSelected

    if (!itm) {
      let msg = 'É preciso especificar qual o item financiado nesta proposta.';
      this._messageService.handleError(msghead, `${msg}`);
      return false;
    }

    return true;

  }
  formPropostaok(proposta) {
    /**
     Faz a verificação das variaveis se foram configuradas corretamente e valida o formulário
     *
     */
    const msghead = 'Registros incompletos';

    const bank = this.formprop.controls.banco.value;

    if (!bank) {
      let msg = 'É preciso especificar qual o Banco financiador da proposta.';
      this._messageService.handleError(msghead, `${msg}`);
      return false;
    }

    const linha = this.formprop.controls.linha.value;
    if (!linha) {
      let msg = 'É preciso especificar a linha de crédito aplicada.';
      this._messageService.handleError(msghead, `${msg}`);
      return false;
    }

    const txjurosaa = this.formprop.controls.txjurosaa.value;
    if ((isNaN(txjurosaa)) || Number(txjurosaa) == 0) {
      let msg = 'A taxa anual de juros deve ser um número válido e maior que 0.';
      this._messageService.handleError(msghead, `${msg}`);
      return false;
    }

    const anoprimpgm = moment(this.formprop.controls.anoprimpgm.value);
    const anoultpgm = moment(this.formprop.controls.anoultpgm.value);

    if ((!anoprimpgm.isValid())) {
      let msg = 'É preciso especificar a data da primeira parcela.';
      this._messageService.handleError(msghead, `${msg}`);
      return false;
    }
    if ((!anoultpgm.isValid())) {
      let msg = 'É preciso especificar a data da última parcela.';
      this._messageService.handleError(msghead, `${msg}`);
      return false;
    }

    const dtmin = anoprimpgm;//.add(12, 'month');

    if ((anoultpgm.isBefore(dtmin))) {
      let msg = `A data da última parcela será em ${anoultpgm.format('MM/YY')}, mas deve ser após ${dtmin.format("MM/YYYY")}`;
      this._messageService.handleError(msghead, `${msg}`);
      return false;
    }

    if (!(this.itensFinanciados.length > 0) || (!this.itensFinanciados)) {
      let msg = 'Deve haver pelo menos um item a ser financiado nesta proposta..';
      this._messageService.handleError(msghead, `${msg}`);
      return false;
    }

    return true;
  }
  private _confirmAndClose(value: CredRuralModel) {
    try {
      this.confirmResult.next(value);
    } catch (e) {
      this.confirmResult.next(undefined);
    }

    this.bsModalRef.hide();

  }
}
