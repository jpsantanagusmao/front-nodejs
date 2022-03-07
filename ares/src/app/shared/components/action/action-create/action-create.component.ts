import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { Action } from '../../project/models';
import * as moment from 'moment';

@Component({
  selector: 'action-create',
  templateUrl: './action-create.component.html',
  styleUrls: ['./action-create.component.css']
})
export class ActionCreateComponent implements OnInit {
  
  SERVICE: string;

  form: FormGroup;

  @Output() register = new EventEmitter();
  @Input() id: string;

  @Input() actions: Action[] = [];
  action: Action;

  constructor(
    private _usercache: UserCacheService,
    private _route: ActivatedRoute,
  ) { 
    this.id = this._route.snapshot.paramMap.get('id');

  }

  ngOnInit(): void {
    this.createFormNew();
  }

  async createFormNew() {
    const hoje: string = moment().format('YYYY-MM-DD');

    let dtfinal = moment().endOf('year').format('YYYY-MM-DD');

    this.form = new FormGroup({
      description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(150)]),
      referency: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      qtdAtendimentos: new FormControl('1', [Validators.required, Validators.min(1)]),
      valorPorAtendimento: new FormControl('0', [Validators.required, Validators.min(0)]),
      objetivo: new FormControl(''),
      start: new FormControl(hoje),
      end: new FormControl(dtfinal),
    })
  }
  registrar(){
    /**
     * Verifica se tem a descrição igual a algum já registrado no array
     */
    this.action = this.form.value;
    const exists = this.actions.filter(el => (el.description == this.action.description) && (el.referency == this.action.referency));

    if(!(exists.length > 0)){
      this.register.emit(this.action);
    }else{
      alert('Já existe este serviço');
    }
  }
  cancelar(){
    this._usercache.gotoHome();
  }
}
