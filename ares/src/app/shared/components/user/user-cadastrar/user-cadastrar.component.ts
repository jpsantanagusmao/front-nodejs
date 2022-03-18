import { DivisionService } from './../../division/division.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { RoleService } from '../../role/role.service';

@Component({
  selector: 'user-cadastrar',
  templateUrl: './user-cadastrar.component.html',
  styleUrls: ['./user-cadastrar.component.css']
})
export class UserCadastrarComponent implements OnInit {

  form: FormGroup;

  SERVICE: string;

  @Input() id: string;

  usuario: any;
 
  @Output() register = new EventEmitter();

  _roleSelected: string;
  _divisionSelected: string;

  roleBox: any;
  divisionBox: any;
  city: any;

  constructor(
    private usercache: UserCacheService,
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _divisionService: DivisionService,
    private _roleService: RoleService,
  ) {
    this.id = this._route.snapshot.paramMap.get('id');
    this.loadForm();
  }

  ngOnInit(): void {
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
  onSelectCity(city) {
    this.city = city;
  }
  divisionNecessary() {
    const role_class = this.usercache.getUserData().role_class;
    return role_class <= 4 ? false : true;
  }
  async createForm() {

    await this.createFormNew();

    /**
     * Configura o formulário
     */
    const obj = this;

    await this._userService.findById(this.id).subscribe(
      data => {
        const user = data;

        obj.form.controls.name.setValue(user.name, [Validators.required, Validators.minLength(10), Validators.maxLength(150)]);
        obj.form.controls.registry.setValue(user.registry, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]);
        obj.form.controls.email.setValue(user.email, [Validators.required, Validators.email]);
        obj.form.controls.address.setValue(user.address, [Validators.required, Validators.minLength(5), Validators.maxLength(150)]);
        obj.form.controls.num.setValue(user.num, [Validators.required, Validators.minLength(1), Validators.maxLength(5)]);
        obj.form.controls.district.setValue(user.district, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]);
        obj.form.controls.complement.setValue(user.complement);
        obj.form.controls.cep.setValue(user.cep, [Validators.required, Validators.minLength(8), Validators.maxLength(10)]);
        obj.form.controls.phone.setValue(user.phone, [Validators.required, Validators.minLength(11), Validators.maxLength(15)]);
        
        obj._divisionSelected = data?.division_id;
        obj._roleSelected = data?.role_id;

        //configura o departamento
        obj._divisionService.findById(data?.division_id).subscribe(
          div => {
            const division = div;
            obj.divisionBox = {
              id: division?.id,
              name: division?.name
            }
          }
        )
        //configura a permissão
        obj._roleService.findById(data?.role_id).subscribe(
          rol => {
            const role = rol;
            obj.roleBox = {
              id: role?.id,
              type: role?.type
            }
          }
        )

      }
    );
  };

  async createFormNew() {

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(150)]),
      registry: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]),
      num: new FormControl(''),
      district: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      complement: new FormControl(''),
      cep: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(15)]),

    })
  }

  onSelectDivision(value) {
    this._divisionSelected = value;
  }

  onSelectRole(value) {
    this._roleSelected = value;
  }
  formok(){

    const _roleSel = (!this._roleSelected || this._roleSelected == '')?false:true;
    const _citySel = this.city?true:false;
    const _formValid = this.form.valid;
    const _divisionNecessary = this.divisionNecessary();

    return !( 
    ( !_roleSel ) 
    || (this.divisionNecessary()) 
    || (!_citySel)
    || (!this.form.valid));

  }
  registrar() {
    this.usuario = this.form.value;
    this.usuario.role_id = this._roleSelected;
    this.usuario.division_id = this._divisionSelected;
    this.usuario.city = this.city.name;
    this.usuario.uf = this.city.uf;

    const obj = this;

    this.register.emit(this.usuario);

  }

  cancelar() {
    this.usercache.gotoHome();
  }
}
