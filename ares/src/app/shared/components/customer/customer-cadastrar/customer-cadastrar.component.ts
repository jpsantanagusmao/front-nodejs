import { DapService } from './../../dap-mda/dap.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { CustomerService } from '../customer.service';
import { AlertComponent } from 'ngx-bootstrap/alert';
import { AlertMessagesService } from 'src/app/shared/services/alert-messages.service';
import { CpfValidator } from 'src/app/shared/validators/cpf-validator/cpf-validator.component';
import { cpf } from 'cpf-cnpj-validator';

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
  customerselected: any;

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

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(150)]),
      cpf: new FormControl('', [Validators.required, CpfValidator.validate]),
      nickname: new FormControl(''),
      birth_date: new FormControl(''),
      address: new FormControl(''),
      num: new FormControl(''),
      district: new FormControl(''),
      complement: new FormControl(''),
      cep: new FormControl(''),
      phone: new FormControl(''),
    })

    //this.createFormNew();
    //this.loadForm();
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
        /*
                obj.form.controls.name.patchValue(customer.name);
                obj.form.controls.cpf.patchValue(customer.cpf);
                obj.form.controls.nickname.patchValue(customer.nickname);
                obj.form.controls.birth_date.patchValue(customer.birth_date);
                obj.form.controls.address.patchValue(customer.address);
                obj.form.controls.num.patchValue(customer.num);
                obj.form.controls.district.patchValue(customer.district);
                obj.form.controls.complement.patchValue(customer.complement);
                obj.form.controls.cep.patchValue(customer.cep);
                obj.form.controls.phone.patchValue(customer.phone);
                */
        obj.setForm(customer);
      });
  }
  async setForm(customer) {

    //this.cityName = customer.city;
    //this.search.setValue(this.cityName);
    /**
     * Configura o formulário
     */

    const obj = this;
    this.customerselected = customer;

    obj.form.controls.name.patchValue(customer.name);
    obj.form.controls.cpf.patchValue(customer.cpf);
    obj.form.controls.nickname.patchValue(customer.nickname);
    obj.form.controls.birth_date.patchValue(customer?.birth_date);
    obj.form.controls.address.patchValue(customer.address);
    obj.form.controls.num.patchValue(customer.num);
    obj.form.controls.district.patchValue(customer.district);
    obj.form.controls.complement.patchValue(customer.complement);
    obj.form.controls.cep.patchValue(customer.cep);
    obj.form.controls.phone.patchValue(customer.phone);
  }

  async createFormNew() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(150)]),
      cpf: new FormControl('', [CustomerCadastrarComponent.cpf]),
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
    if (this.form.valid === true)
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


    this.customerselected.schooling =  customer.schooling;
    this.customerselected.city =  customer.city;
    this.customerselected.uf =  customer.uf;

    this.onSelected.emit(this.customerselected);
  }

  cancelar() {

  }
  static cpf(control: AbstractControl): { [key: string]: any } {
    if (!(cpf.isValid(control.value))) {
      return { cpf: true };
    }
    return null;
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
            //birth_date: moment(customerWeb.nascimento).format('YYYY-MM-DD'),
            address: customerWeb?.address,
            num: customerWeb?.num,
            district: customerWeb?.district,
            complement: customerWeb?.complement,
            cep: customerWeb?.cep,
            phone: customerWeb?.phone,
            city: customerWeb?.city,
            schooling: '',
            dap: customerWeb?.numDap,
            vencDap: customerWeb?.validade
          }
          obj.setForm(customer);
          /**
           *     this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(150)]),
      cpf: new FormControl('', [CustomerCadastrarComponent.cpf]),
      nickname: new FormControl(''),
      birth_date: new FormControl(''),
      address: new FormControl(''),
      num: new FormControl(''),
      district: new FormControl(''),
      complement: new FormControl(''),
      cep: new FormControl(''),
      phone: new FormControl(''),
    })
           */
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
     * Testa se o CPF é válido
     */
    const cpfValid = cpf.isValid(this.form.controls.cpf.value);

    if (!cpfValid) {
      alert('É preciso informar um CPF válido')
      return;
    }

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
          schooling: '',
          dap: data['numDap'],
          vencDap: validade
        }

        obj.customerselected = customer;
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
