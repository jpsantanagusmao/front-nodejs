import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment.prod';
import { UserCacheService } from './user-cache.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private _http: HttpClient,
    private _usercache: UserCacheService,
    private _router: Router,
  ) { }

  private PATH: string = 'contracts';
  
  createContract(contract: any): Observable<any> {
    return this._http.post(`${env.BASE_API_URL}${this.PATH}/tender`, contract).pipe(
      
    );
  }
}
