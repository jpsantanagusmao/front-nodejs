import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { AterModel } from 'src/app/shared/models/ater.model';
import { statusModel } from 'src/app/shared/models/status.model';
import { v4 as uuidv4 } from 'uuid';
import { TreatmentService } from '../treatment.service';

@Component({
  selector: 'treatment-cadastrar',
  templateUrl: './treatment-cadastrar.component.html',
  styleUrls: ['./treatment-cadastrar.component.css']
})
export class TreatmentCadastrarComponent implements OnInit {

  form: FormGroup;
  formAction: FormGroup;
  _loading: boolean = false;

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
  userDesigned: any = {};

  constructor(
    private _treatmentService: TreatmentService,
    private _userCache: UserCacheService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {

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
    this.customers.push(value);
  }

  onSelectAction(value) {
    this.formAction.controls.descricao.patchValue(value.description, [Validators.minLength(10)]);
    this.formAction.controls.valor.patchValue(value.valorPorAtendimento);

    this.taskSelected = this.formAction.value;

    //Determina a chave estrangeira 'action_id"
    this.taskSelected.action_id = value.id;

  }

  onRemoveAction($event) {

  }

  onIncludeAction($event) {
    const data = this.formAction.value;

    const id = this.id;

    data.status = statusModel.INICIADA;
    data.action_id = this.taskSelected.action_id;
    data.userDesigned_id = this.userDesigned;

    this.tasks.push(data);
  }

  onRegisterTreatment() {
    //Remove o storage de ATER
    this._userCache.removeAter();

    const treatment = this.form.value;
    treatment.actions = this.tasks;
    treatment.customers = this.customers;

    this.onStore.emit(treatment);

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

  async createFormNew() {
    const hoje: string = moment().format('YYYY-MM-DD');

    this.form = new FormGroup({
      local: new FormControl('', [Validators.minLength(5), Validators.maxLength(150)]),
      data: new FormControl(hoje),
      situacao: new FormControl(''),
      orientacao: new FormControl(''),
      recomendacao: new FormControl('')
    });

    this.createFormAction();

  }
  createFormAction() {
    this.formAction = new FormGroup({
      descricao: new FormControl('', [Validators.minLength(10)]),
      qtd: new FormControl('1', [Validators.min(1)]),
      valor: new FormControl('0', Validators.min(0)),
    });

  }

}
