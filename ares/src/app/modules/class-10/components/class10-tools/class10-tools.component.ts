import { Component, OnInit } from '@angular/core';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { UserService } from 'src/app/shared/components/user/user.service';
import { AlertMessagesService } from 'src/app/shared/services/alert-messages.service';

@Component({
  selector: 'app-class10-tools',
  templateUrl: './class10-tools.component.html',
  styleUrls: ['./class10-tools.component.css']
})
export class Class10ToolsComponent implements OnInit {

  constructor(
    private _userCache: UserCacheService,
    private _userService: UserService,
    private _messageService: AlertMessagesService
  ) { }

  ngOnInit(): void {
  }
  async reloadCepea(){
    const obj = this
    await this._userService.reloadCepea()
    .subscribe(
      data=>{
        obj._messageService.handleInfo('Operação concuída', data.message);
      },
      error=>{
        obj._messageService.handleError('Erro', error.message);
      }
    );    
  }
  async updateCepea(){
    const obj = this
    await this._userService.updateCepea()
    .subscribe(
      data=>{
        obj._messageService.handleInfo('Operação concuída', data.message);
      },
      error=>{
        obj._messageService.handleError('Erro', error.message);
      }
    ); 
  }
}
