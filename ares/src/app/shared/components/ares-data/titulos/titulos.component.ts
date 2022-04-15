import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { AlertMessagesService } from 'src/app/shared/services/alert-messages.service';
import { AresDataService } from '../ares-data.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-titulos',
  templateUrl: './titulos.component.html',
  styleUrls: ['./titulos.component.css']
})
export class TitulosComponent implements OnInit {
  form: FormGroup;

  _loading: boolean = Boolean(false);
  titulos$: Observable<any>

  constructor(
    private _aresDataService: AresDataService,
    private _userCache: UserCacheService,
    private _messageService: AlertMessagesService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      search: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)])
    });

  }
  onSearch(){
    const nome = this.form.controls.search.value;
    console.log('pesquisando')
    console.log(nome)
    this.titulos$ = this._aresDataService.findTitulos(nome).pipe(
      tap(console.log)
    );
  }

}
