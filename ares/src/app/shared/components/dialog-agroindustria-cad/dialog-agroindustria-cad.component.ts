import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AgroIndustriaModel } from './agro-industria.model';
import * as moment from 'moment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AlertMessagesService } from '../../services/alert-messages.service';
import { Produto, PRODUTOAGRO } from './produto-agroind.model';
import { CONDCERTIFICACAO, CondCertificacao } from './situacao-certificacao.model';
import { MESES } from '../../models/meses.model';
import { OrigemMp, ORIGEMMP } from './origem-mp.model';
import { TipoAgro, TIPOAGRO } from './tipo-agro.model';

@Component({
  selector: 'app-dialog-agroindustria-cad',
  templateUrl: './dialog-agroindustria-cad.component.html',
  styleUrls: ['./dialog-agroindustria-cad.component.css']
})
export class DialogAgroindustriaCadComponent implements OnInit {

  confirmResult: Subject<any[]>;

  @Input() title: string = 'Registro de agroindústrias';


  hoje: string = moment().format('YYYY-MM-DD');

  form: FormGroup;//Formulario da proposta

  /**
   * Variáveis de apoio
   */
  agroindustria: AgroIndustriaModel[] = [];
  agroindustriaprd: AgroIndustriaModel;

  produtoSelected: Produto;
  origemmpSelected: OrigemMp;
  certifSelected: CondCertificacao;
  tipoagroSelected: TipoAgro;

  /**
 * Variavies modelos para auxilo nas listas
 */
  MESES_DATA = MESES;
  PRODUTO_DATA = PRODUTOAGRO;
  ORIGEM_DATA = ORIGEMMP;
  TIPOAGRO_DATA = TIPOAGRO;
  CONDCERTIFICACAO_DATA = CONDCERTIFICACAO;

  /**
   * 
   * @param bsModalRef 
   * @param fb 
   * @param _messageService 
   */

  public constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private _messageService: AlertMessagesService
  ) {

    this.form = this.fb.group({
      produto: [''],
      mesinicioprod: ['1'],
      mesfimprod: ['12'],
      prdanual: ['0'],
      precoatual: ['0'],
      situacaocertif: [''],
      origemmp: [''],//Origem da matéria prima(Comprada, produção própria, etc)
      ppmp: ['0'],//produção própria da matéria prima. Representa a quantidade que o produtor processa.
      tipoagro: ['']//Informa se é agroindustria familiar, coletiva ou empresarial
    });

  }

  get precoatualtxt() {

    if (this.produtoSelected) {
      return ` (R$/${this.produtoSelected?.unid})`
    }
    return '';
  }
  get prdanualtxt() {

    if (this.produtoSelected) {
      return ` (${this.produtoSelected?.unid})`;
    }
    return '';
  }

  get ppmptxt() {
    if (this.produtoSelected) {
      return ` (${this.produtoSelected.materiaprima?.unid} de ${this.produtoSelected.materiaprima.descricao}))`;
    }
    return '';
  }
  ngOnInit(): void {
    this.confirmResult = new Subject();
  }
  onAddNew() {

    if (!this.formok()) {
      return false;
    }

    this.agroindustriaprd = this.form.value;
    this.agroindustriaprd.produto = this.produtoSelected;
    this.agroindustriaprd.origemmp = this.origemmpSelected;
    this.agroindustriaprd.situacaocertif = this.certifSelected;
    this.agroindustriaprd.tipoagro = this.tipoagroSelected;

    this.agroindustria.push(this.agroindustriaprd);

  }

  onSelectmp(){
    const mp: OrigemMp = JSON.parse(this.form.get('origemmp').value);
    this.origemmpSelected = mp;
  }

  onSelectClassAgro(){
    const clagro: TipoAgro = JSON.parse(this.form.get('tipoagro').value);
    this.tipoagroSelected = clagro;
  }

  onSelectCertificacao(){
    const crt: CondCertificacao = JSON.parse(this.form.get('situacaocertif').value);
    this.certifSelected = crt;
  }

  onSelecProduto() {
    this.produtoSelected = JSON.parse(this.form.get('produto').value);
    /*
    {
      representacaobd: JSON.parse(this.form.get('produto').value).representacaobd,
      descricao: JSON.parse(this.form.get('produto').value).descricao,
      unid: JSON.parse(this.form.get('produto').value).unid,
      materiaprima: JSON.parse(this.form.get('produto').value).materiaprima
    };
    */
  }

  onConfirm() {
    const obj = this;

    if (!this.formok()) {
      return;
    }

    this._confirmAndClose(this.agroindustria);
  }

  onClose() {
    this._confirmAndClose(undefined);
  }

  get hasTable() {
    if (this.agroindustria.length > 0) {
      return true;
    }
    return false;
  }
  
  onRemove(){
    this.agroindustria = [];
  }

  formok() {

    const msghead = 'Registros incompletos';

    const produto = this.form.controls.produto.value;
    if (!produto) {
      let msg = 'É necessário informar o produto.';
      this._messageService.handleError(msghead, `${msg}`);
      return false;
    }

    const precoatual = this.form.controls.precoatual.value;
    if ((isNaN(precoatual)) || precoatual == 0) {
      let msg = 'O preço deve ser um número válido maior que 0.';
      this._messageService.handleError(msghead, `${msg}`);
      return false;
    }

    const prdanual = this.form.controls.prdanual.value;
    if ((isNaN(prdanual)) || prdanual == 0) {
      let msg = 'A quantidade produzida anualmente deve ser um número válido maior que 0.';
      this._messageService.handleError(msghead, `${msg}`);
      return false;
    }

    const inicio = this.form.controls.mesinicioprod.value;
    if ((isNaN(inicio)) || inicio < 1 || inicio > 12) {
      let msg = 'O mês de início dever ser entre janeiro e dezembro.';
      this._messageService.handleError(msghead, `${msg}`);
      return false;
    }

    const fim = this.form.controls.mesfimprod.value;
    if ((isNaN(fim)) || fim < 1 || fim > 12) {
      let msg = 'O mês de fim da produção dever ser entre janeiro e dezembro.';
      this._messageService.handleError(msghead, `${msg}`);
      return false;
    }

    if (!(fim >= inicio)) {
      let msg = 'O mês de fim da produção dever após o mês inicial.';
      this._messageService.handleError(msghead, `${msg}`);
      return false;
    }

    const origemmp = this.form.controls.origemmp.value;
    if (!origemmp) {
      let msg = 'A origem da matéria prima deve ser informada.';
      this._messageService.handleError(msghead, `${msg}`);
      return false;
    }

    const situacaocertif = this.form.controls.situacaocertif.value;
    if (!situacaocertif) {
      let msg = 'A situação da certificação deve ser informada.';
      this._messageService.handleError(msghead, `${msg}`);
      return false;
    }

    const tipoagro = this.form.controls.tipoagro.value;
    if (!tipoagro) {
      let msg = 'A classe da agroindústria deve ser informada.';
      this._messageService.handleError(msghead, `${msg}`);
      return false;
    }

    const ppmp = this.form.controls.ppmp.value;
    if ((isNaN(ppmp)) || (ppmp < 0)) {
      let msg = 'Quantidade da matéria prima utilizada deve um número maior ou igual a 0.';
      this._messageService.handleError(msghead, `${msg}`);
      return false;
    }

    return true;

  }

  private _confirmAndClose(value: AgroIndustriaModel[]) {
    try {
      
      const data = value.map((v)=>{
        const data = {
          mesfimprod: v.mesfimprod,
          mesinicioprod: v.mesinicioprod,
          origemmp: v.origemmp.value,
          ppmp: v.ppmp,
          prdanual: v.prdanual,
          precoatual: v.precoatual,
          produto: v.produto.representacaobd,
          produtoUnid: v.produto.unid,
          materiaprima: v.produto.materiaprima.representacaobd,
          materiaprimaunid: v.produto.materiaprima.unid,
          situacaocertif: v.situacaocertif.representacaobd,
          tipoagro: v.tipoagro.value

          
        };
        return data;

      });

      this.confirmResult.next(data);
    } catch (e) {
      this.confirmResult.next(undefined);
    }

    this.bsModalRef.hide();

  }
}

