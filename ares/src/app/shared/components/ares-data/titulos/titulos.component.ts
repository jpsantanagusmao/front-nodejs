import { concat, Observable, Observer, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { AlertMessagesService } from 'src/app/shared/services/alert-messages.service';
import { AresDataService } from '../ares-data.service';
import { tap, filter, distinctUntilChanged, map, delay, switchMap, catchError, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-titulos',
  templateUrl: './titulos.component.html',
  styleUrls: ['./titulos.component.css']
})
export class TitulosComponent implements OnInit {
  form: FormGroup;
  formSearch: FormGroup;

  titulos$: Observable<any>
  
  loaded$: Observable<any>

  _QTD_PROPRIEDADES: number;
  _AREA_TOTAL: number;
  _NUM_MOD: number;


  constructor(
    private _aresDataService: AresDataService,
    private _userCache: UserCacheService,
    private _messageService: AlertMessagesService
  ) { }

  ngOnInit(): void {
    this._userCache.regRoute().subscribe();
    this.form = new FormGroup({
      search: new FormControl('', [Validators.required, Validators.minLength(10)])
    });

    this.formSearch = new FormGroup({
      search_mn: new FormControl('')
    });

  }
  async set_QTD_PROPRIEDADES(lista){
    this._QTD_PROPRIEDADES = await lista.reduce((acc, dt)=>{
      return acc + 1
    },0)
  }
  async set_AREA_TOTAL(lista){
    this._AREA_TOTAL = await lista.reduce((acc, dt)=>{
      return acc + dt.area_total
    },0)
  }
  async set_NUM_MOD(lista){
    this._NUM_MOD = await lista.reduce((acc, dt)=>{
      return acc + dt.rep_modulos_rurais
    },0)
  }

  sumarize(lista){
    this.set_QTD_PROPRIEDADES(lista);
    this.set_AREA_TOTAL(lista);
    this.set_NUM_MOD(lista);
  }
  async onSearchMn() {

    const obj = this;

    const municipio = await this.formSearch.controls.search_mn.value.toLowerCase();

    this.titulos$ = await this.titulos$.pipe(
      filter(value => value.length > 0),
      map(value=>{
        return value.filter(
          value=>{
            if(value.municipio.toLowerCase().includes(municipio)){
              return value;
            }
          }
        )
      }
      ),
      map(
        (value) => {
          obj.sumarize(value);
          return value;
        }
      ),
    );
  }
 
  async onSearch() {
    const nome = this.form.controls.search.value;

    const obj = this;

    if (this.form.valid) {
      this.titulos$ = this._aresDataService.findTitulos(nome).pipe(
        delay(10),
        map(
          (value) => {
            obj.sumarize(value);
            return value;
          }
        ),
      );
    } else {
      alert('Você deve especificar o nome com pelo menos 10 caracteres')
    }
  }

}
