import { Component, OnInit } from '@angular/core';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { UserService } from 'src/app/shared/components/user/user.service';
import { AlertMessagesService } from 'src/app/shared/services/alert-messages.service';

@Component({
  selector: 'app-class7-cadastrar-usuario',
  templateUrl: './class7-cadastrar-usuario.component.html',
  styleUrls: ['./class7-cadastrar-usuario.component.css']
})
export class Class7CadastrarUsuarioComponent implements OnInit {

  usuario: any = {};
  _loading: boolean = false;

  constructor(
    private usercache: UserCacheService,
    private messageService: AlertMessagesService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  onRegister(data) {
    this._loading = true;
    console.log(data);
    
    const obj = this;
    this.userService.save(data).subscribe(
      data => {
        this.messageService.handleSuccess('Sucesso', 'Cadastrado com sucesso;');
        this._loading = false;
      },
      error => {
        obj._loading = false;
        const erromsg = error.error;
        console.error(erromsg);
        this.messageService.handleError(erromsg.name, erromsg.message);
      }
    );
  }
}
