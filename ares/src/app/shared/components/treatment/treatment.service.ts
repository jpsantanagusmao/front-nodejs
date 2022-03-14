import { Observable, EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {

  private PATH: string = 'treatments';

  constructor(
    private http: HttpClient,
  ) { }
 
  findByActionRef(ref: any): Observable<any> {
    if(ref){
      return this.http.get(`${env.BASE_API_URL}${this.PATH}/find-by-action/${ref}`).pipe(
      );
    }
    return EMPTY;
  }

}
