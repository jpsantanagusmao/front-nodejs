import { DapService } from './../dap.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Component({
  selector: 'dap-warning',
  templateUrl: './dap-warning.component.html',
  styleUrls: ['./dap-warning.component.css']
})
export class DapWarningComponent implements OnInit {

  @Output() onReport = new EventEmitter();

  form: FormGroup;

  _loading: boolean = Boolean(false);

  //dapirregular: any[] = [];
  dapirregular$: Observable<any>;
  dapsIrregulares: any;
  ater: any;

  constructor(
    private _dapService: DapService
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
      delay(3000),
      tap((x) => {
        obj.defineAter(x).then(x => {
          obj.loadingToggle();
        });
      })
    );
  }
 
  async loadingToggle() {
    this._loading = !(Boolean(this._loading));
  }

  registerTreatment(dap) {
    const obj = this;
    const rater = this.defineAter(dap).then(function (a) {
      obj.onReport.emit(a);
    });
  }

  async defineAter(dadosDap) {
    const obj = this;

    /**
     * Define texto de situação atual
     */
    let textoSituacao: string = 'Foi identificado que a DAP possui restrições conforme discriminação a seguir: ';
    /**
     * Percorre a lista de irregularidades
     */
    (await dadosDap.map(dpirr => {

      /**
       * Percorres a lista de motivos
       */
      dpirr.motivos.forEach(mot => {
        textoSituacao = `${textoSituacao} - DAP de número ${dpirr.numDap} ${mot.descricao}; `;
      });


    }));

    /**
     * Define texto de Orientação
     */
    let textoOrientacao: string = '';

    //(await obj.dapirregular.map(mts => {
    (await dadosDap.map(mts => {
      mts.motivos.forEach(e => {
        textoOrientacao = `${textoOrientacao} - DAP de número ${mts.numDap} ${e.providencia}; `;
      });
    }));

    /**
     * Define texto de recomendações
     */
    let textoRecomendacao: string = '';

    textoRecomendacao = `${dadosDap[0].informe}`;

    const regexp = new RegExp(/<(.|\n)*?>/gi);

    textoRecomendacao = textoRecomendacao.replace(/ \n        /, '');
    textoRecomendacao = textoRecomendacao.replace(regexp, '');
    ;

    const ater = {
      local: '',
      situacao: textoSituacao,
      orientacao: textoOrientacao,
      recomendacao: textoRecomendacao
    }

    this.ater = ater;
    return ater;
  }
}
