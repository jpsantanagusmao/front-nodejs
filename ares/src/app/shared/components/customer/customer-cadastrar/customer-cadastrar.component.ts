import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { v4 as uuidv4 } from 'uuid';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'customer-cadastrar',
  templateUrl: './customer-cadastrar.component.html',
  styleUrls: ['./customer-cadastrar.component.css']
})
export class CustomerCadastrarComponent implements OnInit {

  form: FormGroup;
  @Input() id: string;
  SERVICE: string;

  ngOnInit(): void {
    this.createFormNew();
  }
  constructor(
    private usercache: UserCacheService,
    private _route: ActivatedRoute,
    private _customerService: CustomerService,
  ) {
    this.id = this._route.snapshot.paramMap.get('id');
    this.loadForm();
  }
  async loadForm() {
    if (this.id) {
      this.SERVICE = 'Atualizar dados de Usuário';
      await this.createForm();
    } else {
      this.SERVICE = 'Cadastrar Usuário';
      await this.createFormNew();
    }
  }
  async createForm() {

    await this.createFormNew();

    /**
     * Configura o formulário
     */
    const obj = this;

    await this._customerService.findById(this.id).subscribe(
      data => {
        const user = data;

        obj.form.controls.name.setValue(user.name, [Validators.required, Validators.minLength(10), Validators.maxLength(150)]);
        obj.form.controls.registry.setValue(user.registry, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]);
        obj.form.controls.address.setValue(user.address, [Validators.required, Validators.minLength(5), Validators.maxLength(150)]);
        obj.form.controls.num.setValue(user.num, [Validators.required, Validators.minLength(1), Validators.maxLength(5)]);
        obj.form.controls.district.setValue(user.district, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]);
        obj.form.controls.complement.setValue(user.complement);
        obj.form.controls.cep.setValue(user.cep, [Validators.required, Validators.minLength(8), Validators.maxLength(10)]);
        obj.form.controls.phone.setValue(user.phone, [Validators.required, Validators.minLength(11), Validators.maxLength(15)]);


      });
  }


  async createFormNew() {

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(150)]),
      cpf: new FormControl(''),
      nickName: new FormControl('', [Validators.minLength(5), Validators.maxLength(50)]),
      registry: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      birth_date: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]),
      num: new FormControl(''),
      district: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      complement: new FormControl(''),
      cep: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(15)]),
      city: new FormControl(''),
      uf: new FormControl(''),
      schooling: new FormControl(''),
    })
  }
  onSelectCity(city){
    console.log(city);
  }
}
