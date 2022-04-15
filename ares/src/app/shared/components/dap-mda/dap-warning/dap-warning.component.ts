import { DapService } from './../dap.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { AlertMessagesService } from 'src/app/shared/services/alert-messages.service';
import { AterModel } from 'src/app/shared/models/ater.model';
import { UserCacheService } from 'src/app/core/user-cache.service';

@Component({
  selector: 'dap-warning',
  templateUrl: './dap-warning.component.html',
  styleUrls: ['./dap-warning.component.css']
})
export class DapWarningComponent implements OnInit {

  @Output() onReport = new EventEmitter();

  form: FormGroup;

  _loading: boolean = Boolean(false);
  has_dap: boolean = Boolean(false);

  //dapirregular: any[] = [];
  dapirregular$: Observable<any>;
  dapsIrregulares: any;
  ater: any;
 
  constructor(
    private _dapService: DapService,
    private _userCache: UserCacheService,
    private _messageService: AlertMessagesService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      search: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)])
    });
  }

  async emitReport() {
    /**
 * Consulta irregularidades
 */
    const cpf = this.form.controls.search.value;
    const obj = this;

    await this.loadingToggle();

    this.dapirregular$ = await this._dapService.queryAcerbity(cpf).pipe(
      delay(100),
      tap((x) => {
        //console.log(x)
        try {
          if (Number(x.length) > 0) {

            obj.has_dap = Boolean(true);
            obj.defineAter(x).then(x => {
              obj.loadingToggle();
              this.has_dap = Boolean(true);
              this._loading = Boolean(false);
            });

          } else {
            obj._loading = Boolean(false);
            obj.has_dap = Boolean(false);
            obj._messageService.handleSuccess('Consulta irregularidade', 'Não há irregularidades para este produtor.')
            obj.dapirregular$ = undefined;
          }

        } catch (e) {
          this._loading = Boolean(false);
          this._messageService.handleSuccess('Consulta irregularidade', 'Não há irregularidades para este produtor.')
        }

      })
    );
  }

  async loadingToggle() {
    this._loading = !(Boolean(this._loading));
  }

  formvalid() {
    if (this.has_dap === true && this.form.valid === true) {
      return true;
    } else {
      return false;
    }

  }
  registerTreatment(dap) {
    const obj = this;

    const rater = this.defineAter(dap).then(function (a) {
      obj.onReport.emit();
    });


  }


  async defineAter(dadosDap) {
    const obj = this;

    /**
     * Define texto de situação atual
     */
    let situacao: string = 'Foi identificado que a DAP possui restrições conforme discriminação a seguir: ';
    /**
     * Percorre a lista de irregularidades
     */
    (await dadosDap.map(dpirr => {

      /**
       * Percorre a lista de motivos
       */
      dpirr.motivos.forEach(mot => {
        situacao = `${situacao} - DAP de número ${dpirr.numDap} ${mot.descricao}; `;
      });


    }));


    /**Variável de controle para registro do atendimento */
    const dap = dadosDap[0];

    /**
     * Define o local do atendimento
     */
    const local = dap.municipio;

    /**
     * Definição dos beneficiários do serviço de ATER
     */
    let customers: any[] = [];

    const titular = {
      name: dap.titular1,
      cpf: dap.titular1cpf,
      //birth_date: dap.titular.nascimento,
      //address: dap.titular.endereco,
      city: dap.municipio,
    };

    customers.push(titular);
    /**
     * Caso haja um segundo beneficiário
     */
    if (dap.titular2) {
      customers.push({
        name: dap.titular2,
        cpf: dap.titular2cpf,
        //birth_date: dap.titular.nascimento,
        //address: dap.titular.endereco,
        city: dap.municipio,

      });

    }


    /**
     * Define texto de Orientação
     */
    let orientacao: string = '';

    //(await obj.dapirregular.map(mts => {
    (await dadosDap.map(mts => {
      mts.motivos.forEach(e => {
        orientacao = `${orientacao} - DAP de número ${mts.numDap} ${e.providencia}; `;
      });
    }));

    /**
     * Define texto de recomendações
     */
    let recomendacao: string = '';

    recomendacao = `${dadosDap[0].informe}`;

    const regexp = new RegExp(/<(.|\n)*?>/gi);

    recomendacao = recomendacao.replace(/ \n        /, '');
    recomendacao = recomendacao.replace(regexp, '');
    ;
/*
    const ater = {
      local: local,
      customers: customers,
      situacao: situacao,
      orientacao: orientacao,
      recomendacao: recomendacao
    }
*/
    const ater: AterModel = {
      local,customers, situacao, orientacao, recomendacao
    };
    /**
     * Registra a ater no cookie
     */
    obj._userCache.createAter(JSON.stringify(ater));
   // obj.onReport.emit();

    obj.ater = ater;
    return ater;
  }
}
