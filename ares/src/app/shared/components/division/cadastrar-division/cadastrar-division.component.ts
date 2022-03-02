import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { DivisionService } from '../division.service';

@Component({
  selector: 'app-cadastrar-division',
  templateUrl: './cadastrar-division.component.html',
  styleUrls: ['./cadastrar-division.component.css']
})
export class CadastrarDivisionComponent implements OnInit {
  
  form: FormGroup;

  SERVICE: string;

  @Input() id: string;

  @Output() register = new EventEmitter();

  constructor(
    private usercache: UserCacheService,
    private _divisionService: DivisionService,
    private _route: ActivatedRoute,
  ) {
    this.id = this._route.snapshot.paramMap.get('id');
    this.loadForm();
  }

  ngOnInit(): void {
  }
  async loadForm() {
    if (this.id) {
      this.SERVICE = 'Atualizar dados de Usuário';
      //await this.createForm();
    } else {
      this.SERVICE = 'Cadastrar Usuário';
      await this.createFormNew();
    }
  }
  async createFormNew() {

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(150)]),
      registry: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]),
      num: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(5)]),
      district: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      complement: new FormControl(''),
      cep: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(15)]),
      city: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      uf: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(2)])

    })
  }
}
