import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { UserService } from '../user.service';
import { AlertMessagesService } from 'src/app/shared/services/alert-messages.service';
import { UserCacheService } from 'src/app/core/user-cache.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {


  id: string;

  constructor(
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _usercache: UserCacheService,
    private _messageService: AlertMessagesService,
    private _location: Location
  ) { }

  ngOnInit(): void {

  }

  onRegister(user){
    const id = this._route.snapshot.paramMap.get('id');
    this._userService.update(id, user).subscribe(
      data=>{
        this._messageService.handleSuccess('Atualização de Cadastro', 'Cadastro de usuário atuallizado com sucesso!')
        this._usercache.gotoHome();
      },
      error=>{
        console.error(error);
        this._messageService.handleSuccess('Atualização de Cadastro', 'Não foi possível atualizar estes dados.')
      }
    );
  }
  goBack(): void {
    //this._location.back();
  }
}
