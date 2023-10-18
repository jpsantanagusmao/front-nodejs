import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import * as moment from 'moment';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { MAService } from '../MAService';

@Component({
  selector: 'consulta-infracoes',
  templateUrl: './consulta-infracoes.ts.component.html',
  styleUrls: ['./consulta-infracoes.ts.component.css']
})
export class ConsultaInfracoesComponent implements OnInit {

  @Output() onReport = new EventEmitter();

  form: FormGroup;

  _loading: boolean = Boolean(false);

  infracoes$: Observable<any>;

  /**
   * 
   */

  recomendacoesVector: string[] = [
    '',
    ``
  ]

  orientacoesVector: string[] = [
    `
    `
  ];

  constructor(
    private _maService: MAService,
    private _userCache: UserCacheService
  ) { }

  ngOnInit(): void {
    this._userCache.regRoute().subscribe();
    this.form = new FormGroup({
      search: new FormControl('33928592734', [Validators.required, Validators.minLength(11), Validators.maxLength(11)])
    });
  }

  async emitReport() {
    /**
 * Consulta irregularidades
 */
    const cpf = this.form.controls.search.value;

    await this.loadingToggle();

    this.infracoes$ = this._maService.findByCpf(cpf).pipe(tap(console.log));
  }

  async loadingToggle() {
    this._loading = !(Boolean(this._loading));
  }

  async registerTreatment(infracao) {

    let situacao = 'sdasd';
    let orientacao = 'asda';
    let recomendacao = 'asas';
    let customers = [];

    const titular = {
      name: infracao.nome,
      cpf: infracao.cpf,
    };

    customers.push(titular);
    /**
     * Caso haja um segundo beneficiário
     */


    const ater = {
      customers, situacao, orientacao, recomendacao
    };
    /**
     * Registra a ater no cookie
     */
    this._userCache.createAter(JSON.stringify(ater));
    this.onReport.emit(true);

  }
}

