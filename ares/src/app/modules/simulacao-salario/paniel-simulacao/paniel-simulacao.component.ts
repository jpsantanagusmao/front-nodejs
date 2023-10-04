import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { CustomerService } from 'src/app/shared/components/customer/customer.service';
import { AlertMessagesService } from 'src/app/shared/services/alert-messages.service';
import { ServiceSimulacaoService } from '../services/service-simulacao.service';
import { ReactiveFormsModule } from '@angular/forms';
import { tap } from 'rxjs/operators';

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


showData(){
  return false;
}

simular(){
  //this.service.simularsalario(this.form.value)
  this.pagamentos$ = this.service.simularsalario(this.form.value).pipe(
    tap((d) => {

      //obj.loadingToggle()

    })
  );
}
}
