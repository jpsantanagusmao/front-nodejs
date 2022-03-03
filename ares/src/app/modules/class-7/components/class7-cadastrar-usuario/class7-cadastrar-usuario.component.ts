import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }
  
  onRegister(data) {

    this._loading = true;
    
    const obj = this;
    this.userService.save(data).subscribe(
      data => {
        /**
         * Redireciona a página para a lista de todos os usuários
         */
        this.router.navigate(['/users/private/class7/users-all'])
        this.messageService.handleSuccess('Sucesso', 'Cadastrado com sucesso;');
        obj._loading = false;
      },
      error => {
        obj._loading = false;
      }
    );
  }
}
