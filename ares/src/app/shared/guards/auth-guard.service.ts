import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { AlertMessagesService } from '../services/alert-messages.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  role_class: string[];

  constructor(
    private userCacheService: UserCacheService,
    private messageService: AlertMessagesService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot
  ) {
    this.role_class = route.data.role_class;
    const role_atual = this.userCacheService.user.role_class;

    const lista_roles = this.role_class.map(x=>x.toString());

    if(!(lista_roles.includes(role_atual.toString()))){
      this.messageService.handleError('Acesso não autorizado', 'Você não tem permissão para acessar esta página.' );
      this.userCacheService.gotoUrl(role_atual);
      return false;

    }

    //Verifica se o token expirou
    if (this.userCacheService.isExpired) {
      this.messageService.handleError( "Credencial expirada", "Seu login não é mais válido. Faça login novamente para continuar acessando o sistema." );
      this.userCacheService.logout();
      this.router.navigate(['/']);
      return false;
    }
    if (!this.userCacheService.isLoggedIn) {
      this.messageService.handleError( "Credencial inválida", "Você não está logado. Faça login novamente para continuar acessando o sistema." );
      this.userCacheService.logout();
      this.router.navigate(['/']);
      return false;

    }

    return true;

  }
  
}
