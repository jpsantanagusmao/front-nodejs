import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
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

    //Verifica se o token expirou
    if (this.userCacheService.isExpired) {
      this.messageService.handleError( "Credencial expirada", "Seu login não é mais válido. Faça login novamente para continuar acessando o sistema." );
      this.userCacheService.logout();
      this.router.navigate(['/auth']);
      return false;
    }
    if (!this.userCacheService.isLoggedIn) {
      this.messageService.handleError( "Credencial inválida", "Você não está logado. Faça login novamente para continuar acessando o sistema." );
      this.userCacheService.logout();
      this.router.navigate(['/auth']);
      return false;

    }
    if (!(this.arrayCompare(this.role_class, role_atual) === this.role_class.length)) {
      this.messageService.handleError( "Credencial restrita", "Você não tem permissão para acessar esta página." );
      this.router.navigate([''], { relativeTo: this.route });
      return false;

    }

    return true;


  }
  arrayCompare(first, last) {
    var result = first.filter(rl => result == last.authority);
    return result.length;
  }
}
