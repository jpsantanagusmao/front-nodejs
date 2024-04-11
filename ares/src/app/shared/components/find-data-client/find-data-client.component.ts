import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { ClientsService } from 'src/app/shared/services/clients.service';
import { AlertMessagesService } from '../../services/alert-messages.service';
import { tap } from 'rxjs/operators';
 
@Component({
  selector: 'app-find-data-client',
  templateUrl: './find-data-client.component.html',
  styleUrls: ['./find-data-client.component.css']
})
export class FindDataClientComponent implements OnInit {

  data: string = '';
  form: FormGroup;
 
  _loading: boolean = Boolean(false);
  produtores$: Observable<any>;

  constructor(
    private _userCache: UserCacheService,
    private _clientService: ClientsService,
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

    if (size < 5) {
      
      let msg = 'Você deve informar pelo menos 05 caracteres para realizar a busca'
      this._messageService.handleError(msghead, `${msg}`);
      return false;

    }else{

      this.produtores$ = this._clientService.findClient(data).pipe(
      );
      
    }
    
    
  }
  
  async loadingToggle() {
    this._loading = !(Boolean(this._loading));
  }

}