import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserModel } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserCacheService {

  public static readonly TOKEN: string = 'token';

  user: UserModel;
  expToken: any;
  tokenPayload: any;
  expirationDate: any;
/**
 * Aqui controle-se todas as funções referente ao cache do usuário logado no sistema.
 * Possui todas as informaç~eso referente ao mesmo. bem como o direcionamento de páginas
 */
  constructor(
    private jwtHelper :JwtHelperService
  ) { 

  }
  
  _GetTokenDecoded() {
    //this.tokenPayload = JSON.stringify(this.jwtHelper.decodeToken(this.expToken));
    this.user = (this.jwtHelper.decodeToken(this.expToken));
    //this.user = (this.tokenPayload);
    console.log(this.user);
  }
  _getTokenExpirationDate() {
    this.expirationDate = this.jwtHelper.getTokenExpirationDate(this.expToken);
  }
  _isAuthenticated(): boolean {
    return !this.jwtHelper.isTokenExpired(this.expToken);
  }
  decode(token:any){
    this.expToken = token.token;
    localStorage.setItem(UserCacheService.TOKEN, this.expToken);
    this._GetTokenDecoded();
    this._getTokenExpirationDate();
  }
  deleteToken(){
    localStorage.removeItem(UserCacheService.TOKEN);
  }
  /***
   * Trata o direcionamento das páginas de acordo com o perfil do usuario
   */
  direct_home(){
    // Obtem a classe da permissão do usuário
    //Obtem o grupos do departamento/divisão

  }

}
