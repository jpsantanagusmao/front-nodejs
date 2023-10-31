import { DapService } from './../dap.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import * as moment from 'moment';
import { AterModel } from 'src/app/shared/models/ater.model';
import { UserCacheService } from 'src/app/core/user-cache.service';

@Component({
  selector: 'dap-web',
  templateUrl: './dap-web.component.html',
  styleUrls: ['./dap-web.component.css']
})
export class DapWebComponent implements OnInit {

  @Output() onReport = new EventEmitter();

  form: FormGroup;

  _loading: boolean = Boolean(false);

  dap$: Observable<any>;
  ater: any;

  /**
   * 
   */
  pronome_tratamento_fem: string[] = ['Sra. ', 'Dna '];
  pronome_tratamento_masc: string[] = ['Sr. ', 'Seu '];

  recomendacoesVector: string[] = [
    '- Providenciar os documentos solicitados e encaminhar ao escritório local para que possa ser realizado o seu registro. ',
    `A DAP/CAF é um documento de direito do Agricultor Familiar e a emissão da mesma é GRATUITA. Por ser um documento de domínio público, qualquer ação judicial será desferida na esfera federal .`
  ]

  orientacoesVector: string[] = [
    `
A antiga DAP - Declaração de Aptidão do PRONAF ou CAF(atual) é utilizada como instrumento de identificação do agricultor familiar para acessar políticas públicas do Governo Federal, e é necessário apresentar no ato da elaboração da DAP os seguintes documentos: 
 CPF e Identidade - do agricultor (a) familiar e de todos os membros desta uniadade familiar (pessoa que residem na mesma propriedade);
 Certidão de casamento;
 Comprovante de residência (conta de energia);
 Contrato de Compra e Venda, Declaração de Posse ou Matrícula do Cartório de Registro de Imóveis dos estabelecimentos rurais beneficiados com o crédito;
 Comprovante de renda dos últimos 12 meses, tais como: notas fiscais de entrada;
 holerite do agricultor (a), cônjuge e agregados (se possuir); recibos;
    `
  ];

  constructor(
    private _dapService: DapService,
    private _userCache: UserCacheService
  ) { }

  ngOnInit(): void {
    this._userCache.regRoute().subscribe();
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

    this.dap$ = this._dapService.findByCpf(cpf).pipe(
      tap((d) => {

        obj.loadingToggle()
      })
    );

  }

  async loadingToggle() {
    this._loading = !(Boolean(this._loading));
  }

  async registerTreatment(dap) {

    let situacao = '';
    //const pronome = dap.titular.genero == 'Masculino' ? this.pronome_tratamento_masc : this.pronome_tratamento_fem;

    let pronome = '';

    if (dap.titular.genero == 'Masculino') {
      pronome = this.pronome_tratamento_masc[Math.floor(Math.random() * this.pronome_tratamento_masc.length)]
    } else {
      pronome = this.pronome_tratamento_fem[Math.floor(Math.random() * this.pronome_tratamento_fem.length)]

    }

    let producao_texto = '';
    const qtd = dap.rendas.length;
    let i: number = 1;

    const dapVencida = await moment().isAfter(moment(dap.validade));

    await dap.rendas.map(r => {
      if (i == qtd) {
        producao_texto = producao_texto + `${r.producao} renda auferida de ${Number(r.auferida).toFixed(2)}`;
      } else {
        if (i == (qtd - 1)) {
          producao_texto = producao_texto + `, ${r.producao} renda auferida de ${Number(r.auferida).toFixed(2)} e `;
        } else {
          producao_texto = producao_texto + `${r.producao} renda auferida de ${Number(r.auferida).toFixed(2)}`;
        }
      }
      i = i + 1;
    });
    const area = Number(dap.areaDaPropriedade).toFixed(2);

    if (!dapVencida) {
      situacao = `O ${pronome} ${dap.titular.nome}, proprietario de uma área total de ${area} hectares no local denominado "${dap.nomeImovelPrincipal}" possui a DAP de número ${dap.numDap} com validade até ${moment(dap.validade).format('DD/MM/yyyy')} na qual consta a produção de ${producao_texto}.`;
    } else {
      situacao = `O ${pronome} ${dap.titular.nome}, proprietario de uma área total de ${area} hectares no local denominado "${dap.nomeImovelPrincipal}" possui a DAP de número ${dap.numDap} que expirou na data de ${moment(dap.validade).format('DD/MM/yyyy')}. Neste documento consta a produção de ${producao_texto}.`;
    }

    let orientacao = moment().isBefore(moment(dap.validade)) ? this.orientacoesVector[Math.floor(Math.random() * this.orientacoesVector.length)] : `Como a DAP se econtra EXPIRADA é necessário providenciar os documentos para a renovação.`;
    //let recomendacao = recomendacoes[Math.random(this.recomendacoesVector.length)];
    let recomendacao = this.recomendacoesVector[Math.floor(Math.random() * this.recomendacoesVector.length)];

    /**
     * Definição de local a ser registrado no relatório
     */
    let local = `${dap.nomeImovelPrincipal} - ${dap.localizacaoImovelPrincipal}`;

    /**
     * Definição dos beneficiários do serviço de ATER
     */
    let customers: any[] = [];

    const titular = {
      name: dap.titular.nome,
      cpf: dap.titular.cpf,
      birth_date: dap.titular.nascimento,
      address: dap.titular.endereco,
      city: dap.titular.municipio,
    };

    customers.push(titular);
    /**
     * Caso haja um segundo beneficiário
     */
    if (dap.titular2.cpf) {
      customers.push({
        name: dap.titular2.nome,
        cpf: dap.titular2.cpf,
        birth_date: dap.titular2.nascimento,
        address: dap.titular2.endereco,
        city: dap.titular2.municipio,

      });

    }

    const ater: AterModel = {
      local, customers, situacao, orientacao, recomendacao
    };
    /**
     * Registra a ater no cookie
     */
    this._userCache.createAter(JSON.stringify(ater));
    this.onReport.emit(true);

  }
}

