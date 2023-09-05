import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { AlertMessagesService } from 'src/app/shared/services/alert-messages.service';
import { CarServiceService } from 'src/app/shared/services/car-service.service';

@Component({
  selector: 'app-find-car',
  templateUrl: './find-car.component.html',
  styleUrls: ['./find-car.component.css']
})
export class FindCarComponent implements OnInit {

  data: string = '';
  form: FormGroup;

  _loading: boolean = Boolean(false);
  cars$: Observable<any>;

  constructor(
    private _userCache: UserCacheService,
    private _carservice: CarServiceService,
    private _messageService: AlertMessagesService
  ) { }

  ngOnInit(): void {
    this._userCache.regRoute().subscribe();
    this.form = new FormGroup({
      search: new FormControl('')
    });
  }

  async onSearch() {
    //await this.loadingToggle();
    const obj = this;

    const data = this.form.controls.search.value
    const size = data.length;
    const msghead = 'Não é possível realizar esta busca';

    if (size < 10) {
      let msg = 'Você deve informar pelo menos 10 caracteres para realizar a busca'
      this._messageService.handleError(msghead, `${msg}`);
      return false;
    }

    this.cars$ = this._carservice.findCar(data).pipe();

  }
  
  async loadingToggle() {
    this._loading = !(Boolean(this._loading));
  }

}
