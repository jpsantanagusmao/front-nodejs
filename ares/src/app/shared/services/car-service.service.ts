import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment as env } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CarServiceService {

  private PATH: string = 'ares-data/car';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }
  findCar(data): Observable<any> {
   
    let params = new HttpParams();
    params = params.append('data', data);
    
    const link = `${env.BASE_API_URL}${this.PATH}/find-car`;

    return this.http.post(link, params);
 
  }
}
