import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserModel } from '../shared/models/user.model';
import * as moment from 'moment';
import { environment as env } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserCacheService  implements OnInit {

  public static readonly TOKEN_STORAGE_VAR: string = 'token';
  public static readonly ATER_STORAGE_VAR: string = 'ater';

  private static readonly PRIVATE_LINK = '/users/private/';
  private static readonly PRIVATE_TASKS_API = '/users';
  
  private PATH: string = 'users';

  public static readonly WELCOME: string = '/welcome/start';
  public static readonly CLASS_0: string = `${UserCacheService.PRIVATE_LINK}class0/root`;
  public static readonly CLASS_1: string = `${UserCacheService.PRIVATE_LINK}class1/root`;
  public static readonly CLASS_2: string = `${UserCacheService.PRIVATE_LINK}class2/root`;
  public static readonly CLASS_3: string = `${UserCacheService.PRIVATE_LINK}class3/root`;
  public static readonly CLASS_4: string = `${UserCacheService.PRIVATE_LINK}class4/root`;
  public static readonly CLASS_5: string = `${UserCacheService.PRIVATE_LINK}class5/root`;
  public static readonly CLASS_6: string = `${UserCacheService.PRIVATE_LINK}class6/root`;
  public static readonly CLASS_7: string = `${UserCacheService.PRIVATE_LINK}class7/root`;
  public static readonly CLASS_8: string = `${UserCacheService.PRIVATE_LINK}class8/root`;
  public static readonly CLASS_9: string = `${UserCacheService.PRIVATE_LINK}class9/root`;
  public static readonly CLASS_10: string = `${UserCacheService.PRIVATE_LINK}class10/root`;

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
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {
    this._GetTokenDecoded();
  }
  ngOnInit(): void {

  }

  get token(){
    this._token = localStorage.getItem(UserCacheService.TOKEN_STORAGE_VAR);
    return this._token;
    
  }
  set token(value){
    localStorage.setItem(UserCacheService.TOKEN_STORAGE_VAR, value);
    this._token = value;
  }


  get isExpired(){
    this._GetTokenDecoded();

    const dtExp = moment(this.user.expiresIn);

    return moment().isAfter(dtExp);
  }
  
  get isLoggedIn(){
    this._GetTokenDecoded();

    const logged = this.user?true:false;

    if(!logged){
      this.logout();
    }

    return logged;
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

  get isAuthenticated() {
    this._GetTokenDecoded();
    /*Verifica se está autenticado*/
   return this.isLoggedIn;
   
  }

  public async decode(token: any) {
    
    this.token = token.token;
    this._GetTokenDecoded();
    this._getTokenExpirationDate();

    /*
    direciona para a página de classe
    */

    const classe = await this.user.role_class;

    //this.gotoUrl(classe);
    this.gotoHome(); 
    
  }

  /**
   * Retorna à página principal do usuário logado
   */
  async gotoHome(){
    this.token = localStorage.getItem(UserCacheService.TOKEN_STORAGE_VAR);
    this._GetTokenDecoded();
    this._getTokenExpirationDate();
    const role_class = this.user.role_class;
    await this.gotoUrl(role_class);
  }

  gotoRoot(){
    this.gotoUrl(0);
  }

  gotoUrl(role_class){
    
    if (role_class === 0)
      this.router.navigate([UserCacheService.CLASS_0]);
    if (role_class === 1)
      this.router.navigate([UserCacheService.CLASS_1]);
    if (role_class === 2)
      this.router.navigate([UserCacheService.CLASS_2]);
    if (role_class === 3)
      this.router.navigate([UserCacheService.CLASS_3]);
    if (role_class === 4)
      this.router.navigate([UserCacheService.CLASS_4]);
    if (role_class === 5)
      this.router.navigate([UserCacheService.CLASS_5]);
    if (role_class === 6)
      this.router.navigate([UserCacheService.CLASS_6]);
    if (role_class === 7)
      this.router.navigate([UserCacheService.CLASS_7]);
    if (role_class === 8)
      this.router.navigate([UserCacheService.CLASS_8]);
    if (role_class === 9)
      this.router.navigate([UserCacheService.CLASS_9]);
    if (role_class === 10)
      this.router.navigate([UserCacheService.CLASS_10]);
  }

  public logout() {
    this._deleteToken();
    this.router.navigate([UserCacheService.WELCOME]);

  }

  public getUserData() {
    this._GetTokenDecoded();
    const u = this.user;

    this.isLoggedIn;
    
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

  public createAter(ater){
    localStorage.setItem(UserCacheService.ATER_STORAGE_VAR, ater);
  }

  public removeAter(){
    localStorage.removeItem(UserCacheService.ATER_STORAGE_VAR);
  }
  public getAter(){
    return localStorage.getItem(UserCacheService.ATER_STORAGE_VAR);
  }

}
