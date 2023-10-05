import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { CustomerService } from 'src/app/shared/components/customer/customer.service';
import { AlertMessagesService } from 'src/app/shared/services/alert-messages.service';
import { ServiceSimulacaoService } from '../services/service-simulacao.service';
import { ReactiveFormsModule } from '@angular/forms';
import { tap } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-paniel-simulacao',
  templateUrl: './paniel-simulacao.component.html',
  styleUrls: ['./paniel-simulacao.component.css']
})
export class PanielSimulacaoComponent implements OnInit {
  /*
  nivel = 'nivel'
  datacontrato = 'datacontrato'
  datagraduacao = 'datagraduacao'
  datapos1 = 'datapos1'
  datapos2 = 'datapos2'
  datamestrado = 'datamestrado'
  */
  form: FormGroup

  pagamentos$: any;
  total$: any;
  niveis$: any;
  _loading: boolean = Boolean(false);

  constructor(
    private usercache: UserCacheService,
    private _route: ActivatedRoute,
    private _customerService: CustomerService,
    private _messageService: AlertMessagesService,
    private service: ServiceSimulacaoService
  ) {
    this.form = new FormGroup({
      nivel: new FormControl(''),
      datacontrato: new FormControl(''),
      datagraduacao: new FormControl(''),
      datapos1: new FormControl(''),
      datapos2: new FormControl(''),
      datamestrado: new FormControl(''),
    })
  }

  ngOnInit(): void {

    this.niveis$ = this.service.niveis().pipe(

      tap((d) => {

        //obj.loadingToggle()

      })
    );
  }

  showData() {
    return this.total$ ? true : false;
  }

  async simular() {

    let body = this.form.value

    body.datacontrato = body.datacontrato ? moment(body.datacontrato).format('DD/MM/YYYY') : undefined;
    body.datagraduacao = body.datagraduacao ? moment(body.datagraduacao).format('DD/MM/YYYY') : undefined;
    body.datapos1 = body.datapos1 ? moment(body.datapos1).format('DD/MM/YYYY') : undefined;
    body.datapos2 = body.datapos2 ? moment(body.datapos2).format('DD/MM/YYYY') : undefined;
    body.datamestrado = body.datamestrado ? moment(body.datamestrado).format('DD/MM/YYYY') : undefined;

    body = JSON.parse(JSON.stringify(body));
    let obj = this
    this.pagamentos$ = this.service.simularsalario(body).pipe(
      tap((d) => {

        obj.total$ = obj.somatabela(d)

      })
    );

  }
  somatabela(obs) {

    return obs.reduce(function (acc, obj) { return acc + obj.DIFERECA; }, 0);

  }
}
