import { UserModel } from './../../../models/user.model';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'user-cadastrar',
  templateUrl: './user-cadastrar.component.html',
  styleUrls: ['./user-cadastrar.component.css']
})
export class UserCadastrarComponent implements OnInit {

  formCliente: FormGroup;

  @Input() usuario = {};
  
  ngOnInit(): void {
    this.createForm(this.usuario);
  }

  createForm(user) {
    this.formCliente = new FormGroup({
      name: new FormControl(user.name),
      registry: new FormControl(user.registry),
      email: new FormControl(user.email),
      role_id: new FormControl(user.role_id),
      partner_id: new FormControl(user.partner_id),
      division_id: new FormControl(user.division_id),
      address: new FormControl(user.address),
      num: new FormControl(user.num),
      district: new FormControl(user.district),
      complement: new FormControl(user.complement),
      cep: new FormControl(user.cep),
      phone: new FormControl(user.phone),
      city: new FormControl(user.city),
      uf: new FormControl(user.uf)
    })
  }


}
