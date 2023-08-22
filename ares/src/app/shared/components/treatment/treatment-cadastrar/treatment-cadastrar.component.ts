import { take } from 'rxjs/operators';
import { Component, EventEmitter, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { statusModel } from 'src/app/shared/models/status.model';
import { AlertMessagesService } from 'src/app/shared/services/alert-messages.service';
import { v4 as uuidv4 } from 'uuid';
import { TreatmentService } from '../treatment.service';
import { ProdLeiteModel } from 'src/app/shared/models/prod.leite.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'treatment-cadastrar',
  templateUrl: './treatment-cadastrar.component.html',
  styleUrls: ['./treatment-cadastrar.component.css'],

})

export class TreatmentCadastrarComponent implements OnInit, OnDestroy {

  form: FormGroup;
  formAction: FormGroup;
  _loading: boolean = false;
  _file: File;

  /**
   * Localização do atendimento
   */
  marker: google.maps.Marker;

  @Output() onStore = new EventEmitter();
  //ID para esta operação

  id: string = uuidv4()

  //Ações a registrar para este atendimento
  tasks: any[] = [];
  taskSelected: any = {};

  //Beneficiários a registra para este atendimento
  customers: any[] = [];
  customerSelected: any = {};

  //Usuário designado para determinada tarefe
  userDesigned: any = undefined;

  data: any;
  producaoLeite: ProdLeiteModel;
  plnCredRural: ProdLeiteModel;
  producaoAgroindustria: any;


  modalRef: BsModalRef;

  constructor(
    private _treatmentService: TreatmentService,
    private _userCache: UserCacheService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _messageService: AlertMessagesService,
    private modalService: BsModalService
  ) {

    this.data = this._userCache.getUserData();

    this.createFormNew();
  }
  async openModal(template: TemplateRef<any>) {

    const tecnico = this._userCache.getUserData()
    const agricultor = this.customers[0]


    const rater = {
      situacao: await this.form.controls.situacao.value,
      orientacao: await this.form.controls.orientacao.value,
      recomendacao: await this.form.controls.recomendacao.value,
      extensionista: await tecnico['name'],
      matricula: tecnico['registry'],
      agricultor: agricultor['name'],
      cpfaf: agricultor['cpf'],
      dap: agricultor['dap'],
      municipio: tecnico['division_city'],
      numvisita: await this.form.controls.visita.value,
      data: this.form.controls.data.value,
      assunto: await this.form.controls.assunto.value,
    }
    
    
    this._userCache.createAterpnae(JSON.stringify(rater));
    this.modalRef = this.modalService.show(template, { class: 'modal-pdf' });
 }
  ngOnDestroy(): void {
    this._userCache.removeAter();
  }

  async ngOnInit() {

    //this._userCache.regRoute().subscribe();

    const ater = JSON.parse(this._userCache.getAter());
    if (ater) {
      this.customers = ater['customers'];
      this.createFormWithOrientacao(ater);

    } else {
      this.createFormNew();

    }
  }

  onSelectUserDesigned(value) {
    if (value) {
      this.userDesigned = value.id;
    }
  }

  onSelectCustomer(value) {

    //verifica se já existe este atendimento por classificação de atendimento

    const exists = this.customers.filter(c => c['cpf'] == value['cpf']);

    if (exists.length > 0) {
      alert('Você á registrou atendimento para este produtor nesta visita');
      return;
    }

    this.customers.push(value);

  }

  onSelectAction(value) {
    this.formAction.controls.description.patchValue(value.description);
    this.formAction.controls.valor.patchValue(value.valorPorAtendimento);

    this.taskSelected = this.formAction.value;

    //Determina a chave estrangeira 'action_id"
    this.taskSelected.action_id = value.id;

  }

  onRemoveAction($event) {

  }

  onIncludeAction($event) {
    //verifica se já existe este atendimento por classificação de atendimento

    const exists = this.tasks.filter(t => t.action_id == this.taskSelected.action_id);

    if (exists.length > 0) {
      alert('Você á registrou este atendimento nesta visita');
      return;
    }

    const data = this.formAction.value;

    const id = this.id;

    data.status = statusModel.INICIADA;
    data.action_id = this.taskSelected.action_id;
    data.userDesigned_id = this.userDesigned;

    this.tasks.push(data);
    this.userDesigned = undefined;
    this.cleanTaskForm();
  }

  cleanTaskForm() {
    this.formAction.controls.description.patchValue('');
    this.formAction.controls.valor.patchValue('0');
  }

  onRegisterTreatment() {
    //Remove o storage de ATER
    this._userCache.removeAter();

    const treatment = this.form.value;
    treatment.actions = this.tasks;
    treatment.customers = this.customers;

    treatment.rater = this._file;
    treatment.id = uuidv4().toUpperCase();

    /**
     * Define as coordenadas do atendimento a se registrar
     */
    if (this.marker) {
      const point = { type: 'Point', coordinates: [this.marker.getPosition().lat(), this.marker.getPosition().lng()] }
      treatment.point = point;
    }

    /**
     * Verifica se houver registro de produção de leite e insere no corpo do objeto treatment
     */
    if (this.producaoLeite) {
      treatment.prodLeite = this.producaoLeite;
    }
    
    /**
     * Verifica se houver registro de proposta de crédito rural e insere no corpo do objeto treatment
     */
    if (this.plnCredRural) {
      treatment.plnCredRural = this.plnCredRural;
    }

    /**
     * Verifica se houver registro de agroindustria e insere no corpo do objeto treatment
     */

    if (this.producaoAgroindustria) {
      treatment.producaoAgroindustria = this.producaoAgroindustria;
    }
    
    //console.log(treatment);

    this.onStore.emit(treatment);

  }

  

  postRater(event) {
    const fileup = event.target.files;
    //console.log(fileup);

    if (event.target.files.length > 0) {
      this._file = event.target.files[0];

      /*
            this.form.patchValue({
              rater: file
            });
            */
    }
  }

  viewRater() {

    const view = document.getElementById('printable');
    const style = this.style();

    let htmlToPrint =
      '<style type="text/css">' +
      style +
      '</style>';
    htmlToPrint += view.outerHTML;
    var win = window.open();
    self.focus();
    win.document.open();
    win.document.write('<' + 'html' + '><' + 'body' + '>');
    win.document.write(htmlToPrint);
    win.document.write('<' + '/body' + '><' + '/html' + '>');
    win.document.close();
    win.print();
    win.close();
    //window.print();
  }

  get empresa() {
    return this.data.partner_name;
  }
  get departamento() {
    return this.data.division_name;
  }
  get endereco() {
    return this.data.division_address;
  }
  get funcionario() {
    return this.data.name;
  }
  get contato() {
    return this.data.division_fone;
  }

  taskOk() {
    if (this.formAction.valid
      && this.userDesigned
    ) {
      return true;
    }
    return false;
  }

  formOk() {

    if (this.form.valid === true && this.tasks.length > 0 && this.customers.length > 0) {
      return true;
    }
    return false;
  }
  onDeleteTask(task) {
    this.tasks.splice(this.tasks.indexOf(task), 1);
  }

  onDeleteCustomer(customer) {
    this.customers.splice(this.customers.indexOf(customer), 1);

  }

  async createFormWithOrientacao(ater) {
    await this.createFormNew();
    this.form.controls.situacao.patchValue(ater.situacao);
    this.form.controls.orientacao.patchValue(ater.orientacao);
    this.form.controls.recomendacao.patchValue(ater.recomendacao);
    this.form.controls.local.patchValue(ater.local);

  }

  onRegistraCredRural() {
    const obj = this;
    this._messageService.showRegCredRural().asObservable().pipe(
      take(1),
      //switchMap(async (result) => result ? result : EMPTY)
    )
      .subscribe(
        data => {
          obj.plnCredRural = data;
          //console.log('lat: ' + data.getPosition().lat() + ' lng: ' + data.getPosition().lng());
        },
        error => {
          console.error(error);
        }
      )
      ;
  }

  onRegistraAgroindustria() {
    const obj = this;
    this._messageService.showRegAgroindustria().asObservable().pipe(
      take(1),
    )
      .subscribe(
        data => {
          obj.producaoAgroindustria = data;
        },
        error => {
          console.error(error);
        }
      )
      ;
  }

  onRegistraProdLeite() {
    const obj = this;
    this._messageService.showRegProdLeite().asObservable().pipe(
      take(1),
      //switchMap(async (result) => result ? result : EMPTY)
    )
      .subscribe(
        data => {
          obj.producaoLeite = data;
          //console.log('lat: ' + data.getPosition().lat() + ' lng: ' + data.getPosition().lng());
        },
        error => {
          console.error(error);
        }
      )
      ;
  }

  onGeo(event: any) {

    const obj = this;
    this._messageService.showPointSelect().asObservable().pipe(
      take(1),
      //switchMap(async (result) => result ? result : EMPTY)
    )
      .subscribe(
        data => {
          obj.marker = data;
          //console.log('lat: ' + data.getPosition().lat() + ' lng: ' + data.getPosition().lng());
        },
        error => {
          console.error(error);
        }
      )
      ;
  }
  private _setGeo(value: google.maps.Marker) {
    this.marker = value;
  }

  async createFormNew() {
    const hoje: string = moment().format('YYYY-MM-DD');

    this.form = new FormGroup({
      local: new FormControl('', [Validators.minLength(5), Validators.maxLength(150)]),
      data: new FormControl(hoje),
      situacao: new FormControl(''),
      orientacao: new FormControl(''),
      recomendacao: new FormControl(''),
      rater: new FormControl(''),
      visita: new FormControl('1'),
      assunto: new FormControl('', [Validators.minLength(15), Validators.maxLength(150)]),
    });

    this.createFormAction();

  }

  createFormAction() {
    this.formAction = new FormGroup({
      description: new FormControl('', [Validators.required]),
      qtd: new FormControl('1', [Validators.required]),
      valor: new FormControl('0', Validators.required),
    });

  }

  style() {
    return `
    form {
      padding: 15px;
      border: 2px solid rgb(250, 220, 217);
      border-radius: 5px;
      margin-top: 5px;
  }
  
  /*
  Componentes de visualização
  */
  #printable {
      font-family: Arial, Helvetica, sans-serif;
      font-size: 12pt;
      width: 20cm;
      height: 29;
  }
  
  .title {
      border: 1px solid black;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      margin: 5px 0px 5px 0px;
      border-radius: 15px;
  }
  
  .title>div:nth-child(1) {
      font-size: 1.4rem;
      margin-top: 10px;
  }
  
  .titulares {
      align-items: center;
      justify-content: center;
      padding: 10px 15px;
      border: 1px solid black;
      border-radius: 15px;
  }
  
  .titulares .titular-head {
      text-align: center;
  }
  
  .titulares>.titular {
      display: flex;
      width: 100%;
      flex-direction: row;
      justify-content: flex-start;
      align-items: stretch;
  }
  
  .titulares .titular .cpf {
      margin-left: 10%;
  }
  
  .emissor {
      font-weight: bold;
  }
  
  .texto {
      height: 20cm;
  }
  
  .ater {
      padding: 10px 15px;
      display: flex;
      flex-direction: column;
      border: 1px solid black;
      margin-top: 5px;
  }
  
  .ater .ater-head {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 15px;
      border-bottom: 3px solid black;
  }
  
  .dados-emp {
      width: 100%;
      border-top: 1px solid var(--secondary);
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: stretch;
  }
  
  .ater-footer {
      border: 1px solid black;
      display: flex;
      flex-direction: row;
      justify-content: start;
      width: 100%;
      border-radius: 15px;
      margin-top: 5px;
      padding: 5px 0px;
      font-size: 0.6rem;
    }
    
    .ater-footer .emissor {
      padding: 5px;
      width: 80%;
  }
  .ater-footer .assinaturas {
      display: flex;
      flex-direction: column;
  }
  
  .ater-footer .assinaturas .titular {
      display: flex;
      flex-direction: row;
  }
  
  .ater-footer .assinaturas .titular .nome {
      margin-top: 10mm;
      border-top: 1px solid black;
      font-size: 0.6rem;
  }
  
  #printable {
      display: block;
  }
  
  .funcionario {
      margin-top: 25px;
  }
  
  p {
      text-align: justify;
  }
  
  @media print {
  
      #printable {
          display: block;
          position: absolute;
          top: 0px;
          background-color: white;
          left: 0px;
          height: 100vh;
          width: 100vw;
      }
  
  
  
  }
    `
  }
}
