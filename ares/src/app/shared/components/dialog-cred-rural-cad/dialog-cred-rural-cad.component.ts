import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { CredRuralModel, itemfinanciado } from '../../models/cred-rural.model';
import * as moment from 'moment';
import { Itemfinanciavel, ITENS_FINANCIAVEIS } from './model/item-financiaveis.model';
import { Banco, BANCO_FINANCIADOR } from './model/banco-financiador.model';
import { LinhaCredito, LINHA_CREDITO } from './model/linha-credito.model';

@Component({
  selector: 'app-dialog-prod-leite-cad',
  templateUrl: './dialog-cred-rural-cad.component.html',
  styleUrls: ['./dialog-cred-rural-cad.component.css']
})
export class DialogCredRuralCadComponent implements OnInit {
  confirmResult: Subject<CredRuralModel>;

  propostacred: CredRuralModel;
  itensFinanciados: itemfinanciado[] = [];
  itemFinanciadoSelected: itemfinanciado;

  ITENS_FINANCIAVEIS_DATA: Itemfinanciavel[] = ITENS_FINANCIAVEIS;
  BANCO_FINANCIADOR_DATA: Banco[] = BANCO_FINANCIADOR;
  LINHA_CREDITO_DATA: LinhaCredito[] = LINHA_CREDITO;

  @Input() title: string = 'Registro de operação de crédito rural';


  hoje: string = moment().format('YYYY-MM-DD');

  formprop: FormGroup;//Formulario da proposta
  formitem: FormGroup;//formulário do item financiado

  public constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder
  ) {
    this.formprop = this.fb.group({
      banco: [''],
      linha: [''],
      apltxjuros: [''],
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
    this.itemFinanciadoSelected = await this.formitem.value;
    this.itensFinanciados.push(this.formitem.value);
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

  ngOnInit(): void {
    this.confirmResult = new Subject();
    const obj = this;
    /*
        this.form = new FormGroup({
          banco: new FormControl(''),
          linha: new FormControl(''),
          modalidade: new FormControl(''),
          apltxjuros: new FormControl('0'),
          anoprimpgm: new FormControl(this.hoje),
          anoultpgm: new FormControl(this.hoje),
          txjurosaa: new FormControl('0'),
        });
      */

  }
  onConfirm() {
    const obj = this;
    //this._confirmAndClose();
  }

  onClose() {
    this._confirmAndClose(undefined);
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
