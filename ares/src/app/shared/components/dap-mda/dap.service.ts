import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { environment as env } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DapService {

  private PATH: string = 'dapweb';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  queryAcerbity(cpf): Observable<any> {
    return this.http.get(`${env.BASE_API_URL}${this.PATH}/query-acerbity/${cpf}`).pipe(
      switchMap(
        data => {

          const dapirregular: any[] = [];

          const parser = new DOMParser();
          const doc_html = parser.parseFromString(data + '', 'text/html');

          let dapsIrregulares: any[] = [];
          const resultado = doc_html.querySelectorAll('body > div.row > .card')

          resultado.forEach(async function (result) {
            const numDap = result.querySelector('#lblDAP').innerHTML.replace("&nbsp;", '');
            const enquadramento = result.querySelector('#lblEnquadramento').innerHTML.replace("&nbsp;", '');
            const dataEmissao = result.querySelector('#lblDataEmissao').innerHTML.replace("&nbsp;", '');
            const dataValidade = result.querySelector('#lblDataValidade').innerHTML.replace("&nbsp;", '');
            const municipio = result.querySelector('#lblUFMunicipio').innerHTML.replace("&nbsp;", '');
            const titular1 = result.querySelector('#lblNome1').innerHTML.replace("&nbsp;", '');
            const titular1cpf = result.querySelector('#lblCPF1').innerHTML.replace("&nbsp;", '');
            const titular2 = result.querySelector('#lblNome2').innerHTML.replace("&nbsp;", '');
            const titular2cpf = result.querySelector('#lblCPF2').innerHTML.replace("&nbsp;", '');
            const informe = (result.querySelector('#lblInformativoIregularidade').innerHTML);

            /**
             * Configurações da Entidade Emissora da DAP
             */
            const emissor = result.querySelectorAll('div > label#lblnomeEmissora');

            const entidade: any[] = [];
            emissor.forEach(em => {
              entidade.push(em.innerHTML);
            })

            const entidadeEmissora = {
              nome: entidade[0],
              cnpj: entidade[1]
            }

            /**
             * Configurações dos registros de motivo de cancelamento
             */
            const tb = result.querySelectorAll('table > tBody > tr');
            let motivos: any[] = [];
            tb.forEach(mt => {
              const rows = mt.querySelectorAll('td');
              let motivo: any = {};
              motivo.descricao = (rows[0].innerText);
              motivo.providencia = (rows[1].innerText);
              motivos.push(motivo);
            });

            /**
             * Configuração da variável de retorno
             */
            const response: any = {};
            response.numDap = numDap;
            response.enquadramento = enquadramento;
            response.dataEmissao = dataEmissao;
            response.dataValidade = dataValidade;
            response.municipio = municipio;
            response.titular1 = titular1;
            response.titular1cpf = titular1cpf;
            response.titular2 = titular2;
            response.titular2cpf = titular2cpf;
            response.informe = informe;
            response.motivos = motivos;
            response.entidadeEmissora = entidadeEmissora;
            dapirregular.push(response);

          })
          //return of({ erros: dapirregular });
          return of(dapirregular);
          //fim Tap
        }
      )
    );
  }
  findByCpf(cpf) {
    return this.http.get(`${env.BASE_API_URL}${this.PATH}/find-by-cpf/${cpf}`).pipe(
      //delay(3000),
      //tap(console.log)
    );
  }
}
