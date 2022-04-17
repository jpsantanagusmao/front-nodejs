import { AresDataService } from './../ares-data.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY, Observable, of } from 'rxjs';
import { delay, map, switchMap, take } from 'rxjs/operators';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { AlertMessagesService } from '../../../services/alert-messages.service';

@Component({
  selector: 'app-r-ater-recomender',
  templateUrl: './r-ater-recomender.component.html',
  styleUrls: ['./r-ater-recomender.component.css']
})
export class RAterRecomenderComponent implements OnInit {
  form: FormGroup;
  formSearch: FormGroup;

  titulos$: Observable<any>

  loaded$: Observable<any>

  constructor(
    private _raterService: AresDataService,
    private _userCache: UserCacheService,
    private _messageService: AlertMessagesService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      search: new FormControl('milho dap chamada', [Validators.required, Validators.minLength(5)])
    });
  }

  async onSearch() {
    const words = this.form.controls.search.value;

    const obj = this;

    if (this.form.valid) {
      this.titulos$ = this._raterService.findModels(words).pipe(
        delay(10),
        map(
          (value) => {
            return value;
          }
        ),
      );
    } else {
      alert('Você deve especificar um assunto com pelo menos 5 caracteres')
    }
  }
  onThisSelection(rater) {

    //Abre caixa de confirmação
    const obj = this;
    const situacao = rater.SITUACAO;
    const orientacao = rater.ORIENTACAO;
    const recomendacao = rater.RECOMENDACAO;

    const confirm$ = this._messageService.showRaterConfirm(situacao, orientacao, recomendacao);

    confirm$.asObservable().pipe(
      take(1),
      switchMap(result => {
        return result ? obj.storedRater(result) : EMPTY
      })

    ).subscribe(
      success => {
        const texto = success.situacao + success.orientacao + success.recomendacao
        obj.sendReportAter(success);
        obj._messageService.handleSuccess('Conclusão de Tarefa', 'Relatório registrado com sucesso.')
      },
      error => {
        console.error(error);
        obj._messageService.handleError('Conclusão de Tarefa', 'Não foi possível registrar a baixa neste momento.')
      }
    );

  }
  sendReportAter(rater) {
  }

  storedRater(rater): Observable<any> {
    return this._raterService.sendReportAter(rater).pipe(
    );
  }
}
