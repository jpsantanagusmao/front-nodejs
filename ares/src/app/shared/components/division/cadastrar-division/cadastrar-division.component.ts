import { DivisionModel } from './../models/division-model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { DivisionService } from '../division.service';

@Component({
  selector: 'cadastrar-division',
  templateUrl: './cadastrar-division.component.html',
  styleUrls: ['./cadastrar-division.component.css']
})
export class CadastrarDivisionComponent implements OnInit {

  MESSAGE_PLACE_HOLDER = 'Informe aqui o representante deste departamento';
  form: FormGroup;

  @Input() SERVICE: string;

  @Input() id: string;

  @Output() register = new EventEmitter();

  representative: any;



  /**
   * Variáveis auxiliares
   */
  themeSelected: string;

  /**
   * 
   * @param usercache 
   * @param _divisionService 
   * @param _route 
   */
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
      nickname: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(150)]),
      registry: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(15)]),
      city: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),

    })
  }
  onSelectTheme(event) {
    this.themeSelected = event;
  }
  registrar() {
    /**
     * Configura os dados
     */
    const division: DivisionModel = this.form.value;

    /**
     * Configura itens que não foram obtidos diretamente no form
     */
    division.theme = this.themeSelected;
    division.representative_id = this.representative.id
    /**
     * Com os dados devidamente configurados é então enviado para o evento
     */
    this.register.emit(division)
  }
  onSelectUser(user) {
    this.representative = user;
  }
  cancelar() {

  }
}
