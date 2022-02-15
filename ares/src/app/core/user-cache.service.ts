import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserModel } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserCacheService {

  public static readonly TOKEN_STORAGE_VAR: string = 'token';

  public static readonly WELCOME: string = '/welcome/start';
  public static readonly CLASS_0: string = '/users/private/class0/root';
  public static readonly CLASS_1: string = '/users/private/class1/root';
  public static readonly CLASS_2: string = '/users/private/class2/root';
  public static readonly CLASS_3: string = '/users/private/class3/root';
  public static readonly CLASS_4: string = '/users/private/class4/root';
  public static readonly CLASS_5: string = '/users/private/class5/root';
  public static readonly CLASS_6: string = '/users/private/class6/root';
  public static readonly CLASS_7: string = '/users/private/class7/root';
  public static readonly CLASS_8: string = '/users/private/class8/root';
  public static readonly CLASS_9: string = '/users/private/class9/root';
  public static readonly CLASS_10: string = '/users/private/class10/root';

  user: UserModel;
  _expToken: any;
  tokenPayload: any;
  expirationDate: any;

  _token: string = ';'
  /**
   * Aqui controle-se todas as funções referente ao cache do usuário logado no sistema.
   * Possui todas as informaç~eso referente ao mesmo. bem como o direcionamento de páginas
   */
  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {
    this._GetTokenDecoded();
  }
  
  get token(){
    this._token = localStorage.getItem(UserCacheService.TOKEN_STORAGE_VAR);
    return this._token;

  }
  set token(value){
    localStorage.setItem(UserCacheService.TOKEN_STORAGE_VAR, value);
    this._token = value;
  }
  private _GetTokenDecoded() {
    try{
      this.user = (this.jwtHelper.decodeToken(this.token));
    }catch(e){
      this.user = undefined;
      this.logout();
    }
  }
  
  private _getTokenExpirationDate() {
    this.expirationDate = this.jwtHelper.getTokenExpirationDate(this.token);
  }

  private _isAuthenticated(): boolean {
    return !this.jwtHelper.isTokenExpired(this.token);
  }

  public decode(token: any) {
    this.token = token.token;
    this._GetTokenDecoded();
    this._getTokenExpirationDate();
    /*
    direciona para a página de classe
    */
    let classe = 0;

    if (classe === 0)
      this.router.navigate([UserCacheService.CLASS_0]);
    if (classe === 1)
      this.router.navigate([UserCacheService.CLASS_1]);
    if (classe === 2)
      this.router.navigate([UserCacheService.CLASS_2]);
    if (classe === 3)
      this.router.navigate([UserCacheService.CLASS_3]);
    if (classe === 4)
      this.router.navigate([UserCacheService.CLASS_4]);
    if (classe === 5)
      this.router.navigate([UserCacheService.CLASS_5]);
    if (classe === 6)
      this.router.navigate([UserCacheService.CLASS_6]);
    if (classe === 7)
      this.router.navigate([UserCacheService.CLASS_7]);
    if (classe === 8)
      this.router.navigate([UserCacheService.CLASS_8]);
    if (classe === 9)
      this.router.navigate([UserCacheService.CLASS_9]);
    if (classe === 10)
      this.router.navigate([UserCacheService.CLASS_10]);

  }

  public logout() {
    this._deleteToken();
    this.router.navigate([UserCacheService.WELCOME]);

  }

  public getUserData() {
    this._GetTokenDecoded();
    return this.user;
  }

  private _deleteToken() {
    localStorage.removeItem(UserCacheService.TOKEN_STORAGE_VAR);
  }
  /***
   * Trata o direcionamento das páginas de acordo com o perfil do usuario
   */
  direct_home() {
    // Obtem a classe da permissão do usuário
    //Obtem o grupos do departamento/divisão

  }

}
