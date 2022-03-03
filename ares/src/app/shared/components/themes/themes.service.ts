import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { environment as env } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ThemesService {
  private PATH: string = 'themes';

  constructor(
    private http: HttpClient,
    private usercache: UserCacheService,
    private router: Router,
  ) { }
  
  findAll(): Observable<any> {
    return this.http.get(`${env.BASE_API_URL}${this.PATH}`).pipe(
    );
  }
}

