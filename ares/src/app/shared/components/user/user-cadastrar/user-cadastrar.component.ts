import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { AlertMessagesService } from 'src/app/shared/services/alert-messages.service';
import { UserService } from '../user.service';

@Component({
  selector: 'user-cadastrar',
  templateUrl: './user-cadastrar.component.html',
  styleUrls: ['./user-cadastrar.component.css']
})
export class UserCadastrarComponent implements OnInit {

  form: FormGroup;

  @Input() usuario: any = {};
  @Output() register = new EventEmitter();
  
  _roleSelected: string;
  _divisionSelected: string;

  constructor(
    private usercache: UserCacheService,
  ){}

  ngOnInit(): void {

    this.createForm(this.usuario);

  }

  createForm(user) {
    this.form = new FormGroup({
      name: new FormControl(''),
      registry: new FormControl(''),
      email: new FormControl(''),
      address: new FormControl(''),
      num: new FormControl(''),
      district: new FormControl(''),
      complement: new FormControl(''),
      cep: new FormControl(''),
      phone: new FormControl(''),
      city: new FormControl(''),
      uf: new FormControl('')
    
    })
  }

  onSelectDivision(value){
    this._divisionSelected = value;
  }

  onSelectRole(value){
    this._roleSelected = value;
  }

  registrar() {
    this.usuario = this.form.value;
    this.usuario.role_id = this._roleSelected;
    this.usuario.division_id = this._divisionSelected;

    const obj = this;

    this.register.emit(this.usuario);

  }

  cancelar() {
    this.usercache.gotoHome();
  }
}
