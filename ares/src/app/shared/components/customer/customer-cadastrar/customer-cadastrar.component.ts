import { DapService } from './../../dap-mda/dap.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { CustomerService } from '../customer.service';
import { AlertComponent } from 'ngx-bootstrap/alert';
import { AlertMessagesService } from 'src/app/shared/services/alert-messages.service';
import { CpfValidator } from 'src/app/shared/validators/cpf-validator/cpf-validator.component';

@Component({
  selector: 'customer-cadastrar',
  templateUrl: './customer-cadastrar.component.html',
  styleUrls: ['./customer-cadastrar.component.css']
})
export class CustomerCadastrarComponent implements OnInit {

  form: FormGroup;

  _loading: boolean = Boolean(false);

  @Input() id: string;

  @Output() onSelected = new EventEmitter();

  SERVICE: string;

  search = new FormControl();

  citySelected: any = {};
  cityName: string;
  schoolingSelected: any = {};

  ngOnInit(): void {
    this.createFormNew();
  }

  constructor(
    private usercache: UserCacheService,
    private _route: ActivatedRoute,
    private _customerService: CustomerService,
    private _dapService: DapService,
    private _messageService: AlertMessagesService
  ) {
    this.id = this._route.snapshot.paramMap.get('id');
    this.loadForm();
  }

  async loadingToggle() {
    this._loading = !(Boolean(this._loading));
  }

  async loadForm() {
    if (this.id) {
      this.SERVICE = 'Atualizar dados de beneficiário';
      await this.createForm();
    } else {
      this.SERVICE = 'Cadastrar beneficiário';
      await this.createFormNew();
    }
  }
  async createForm() {

    await this.createFormNew();

    /**
     * Configura o formulário
     */
    const obj = this;

    await this._customerService.findByCpf(this.id).subscribe(
      data => {
        const customer = data;

        obj.form.controls.name.setValue(customer.name, [Validators.required, Validators.minLength(10), Validators.maxLength(150)]);
        obj.form.controls.cpf.setValue(customer.cpf, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]);
        obj.form.controls.nickname.setValue(customer.nickname, [Validators.required, Validators.minLength(10), Validators.maxLength(150)]);
        obj.form.controls.birth_date.setValue(customer.birth_date, [Validators.required, Validators.minLength(10), Validators.maxLength(150)]);
        obj.form.controls.address.setValue(customer.address, [Validators.required, Validators.minLength(5), Validators.maxLength(150)]);
        obj.form.controls.num.setValue(customer.num, [Validators.required, Validators.minLength(1), Validators.maxLength(5)]);
        obj.form.controls.district.setValue(customer.district, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]);
        obj.form.controls.complement.setValue(customer.complement);
        obj.form.controls.cep.setValue(customer.cep, [Validators.required, Validators.minLength(8), Validators.maxLength(10)]);
        obj.form.controls.phone.setValue(customer.phone, [Validators.required, Validators.minLength(11), Validators.maxLength(15)]);
      });
  }
  async setForm(customer) {

    //this.cityName = customer.city;
    //this.search.setValue(this.cityName);
    /**
     * Configura o formulário
     */
    const obj = this;
    obj.form.controls.name.setValue(customer.name, [Validators.required, Validators.minLength(10), Validators.maxLength(150)]);
    obj.form.controls.cpf.setValue(customer.cpf, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]);
    obj.form.controls.nickname.setValue(customer.nickname, [Validators.required, Validators.minLength(10), Validators.maxLength(150)]);
    obj.form.controls.birth_date.setValue(customer.birth_date, [Validators.required, Validators.minLength(10), Validators.maxLength(150)]);
    obj.form.controls.address.setValue(customer.address, [Validators.required, Validators.minLength(5), Validators.maxLength(150)]);
    obj.form.controls.num.setValue(customer.num, [Validators.required, Validators.minLength(1), Validators.maxLength(5)]);
    obj.form.controls.district.setValue(customer.district, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]);
    obj.form.controls.complement.setValue(customer.complement);
    obj.form.controls.cep.setValue(customer.cep, [Validators.required, Validators.minLength(8), Validators.maxLength(10)]);
    obj.form.controls.phone.setValue(customer.phone, [Validators.required, Validators.minLength(11), Validators.maxLength(15)]);
  }

  async createFormNew() {

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(150)]),
      cpf: new FormControl('', [Validators.required, CpfValidator]),
      nickname: new FormControl(''),
      birth_date: new FormControl(''),
      address: new FormControl(''),
      num: new FormControl(''),
      district: new FormControl(''),
      complement: new FormControl(''),
      cep: new FormControl(''),
      phone: new FormControl(''),
    })
  }
  onSelectCity(city) {
    this.citySelected = city;

  }
  onSelectSchooling(schooling) {
    this.schoolingSelected = schooling;

  }
  formOk() {
    if ( this.form.valid === true )
      return true;
    return false;
  }

  registrar() {
    const customer = this.form.value;
    /**
     * Define a Cidade e UF
     */
    customer.city = this.citySelected.city;
    customer.uf = this.citySelected.uf;

    /**
     * Define a escolaridade
     */
    customer.schooling = this.schoolingSelected.schooling;

    this.onSelected.emit(customer);
  }

  cancelar() {

  }

  async onFindInAres() {
    /**
     * Localizar registro no banco de dados e configura o form
     */
    let customerWeb: any;
    const obj = this;
    
    obj._loading = Boolean(true);

    await this._customerService.findByCpf(this.form.controls.cpf.value).subscribe(
      data => {
        customerWeb = data;

        if (data != null) {
          const customer = {
            name: customerWeb?.name,
            nickname: `${customerWeb?.nickname}`,
            cpf: customerWeb.cpf,
            birth_date: moment(customerWeb.nascimento).format('YYYY-MM-DD'),
            address: customerWeb?.address,
            num: customerWeb?.num,
            district: customerWeb?.district,
            complement: customerWeb?.complement,
            cep: customerWeb?.cep,
            phone: customerWeb?.phone,
            city: customerWeb?.city,
            schooling: ''
          }
          obj.setForm(customer);
          
        }
        obj.loadingToggle();
      },
      error => {
        obj.loadingToggle();
        console.log(error);
        this._messageService.handleError('Registro de DAP', 'Não foi ppossível localizar o registro desta pessoa.')
      }
    );
    /**
     * Caso não encontre, se for no departamento de AGRO pesquisa nos registros de DAps
     */
  }
  async localizarRegistroMda() {
    /**
     * Localizar registro no banco de dados e configura o form
     */
    let customerWeb: any;
    const obj = this;
    
    obj._loading = Boolean(true);

    await this._dapService.findByCpf(this.form.controls.cpf.value).subscribe(
      data => {
        customerWeb = data;

        const validade = moment(data['validade']).format('DD/MM/YYYY');
        this._messageService.handleInfo('Declaração de aptidão', `A DAP ${data['numDap']} vence em ${validade}.`);

        const customer = {
          name: customerWeb.titular.nome,
          nickname: `Filho de ${customerWeb.titular.mae}`,
          cpf: customerWeb.titular.cpf,
          birth_date: moment(customerWeb.titular.nascimento).format('YYYY-MM-DD'),
          address: customerWeb.titular.endereco,
          num: '',
          district: '',
          complement: '',
          cep: customerWeb.titular.cep,
          phone: '',
          city: '',
          schooling: ''
        }
        obj.setForm(customer);
        obj.loadingToggle();
      },
      error => {
        console.log(error);
        obj.loadingToggle();
        this._messageService.handleError('Registro de DAP', 'Não foi ppossível localizar o registro desta pessoa.')
      }
    );
    /**
     * Caso não encontre, se for no departamento de AGRO pesquisa nos registros de DAps
     */
  }
}
