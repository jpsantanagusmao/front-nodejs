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

  create(treatment: any): Observable<any> {
    return this.http.post(`${env.BASE_API_URL}${this.PATH}`, treatment).pipe(
    );
  }

  findByActionRef(ref: any): Observable<any> {
    if (ref) {
      return this.http.get(`${env.BASE_API_URL}${this.PATH}/find-by-action/${ref}`).pipe(
      );
    }
    return EMPTY;
  }

  /**
   * Modelo de código para impressão de documento
   */
  printDiv(n) {
    var r = document.getElementById(n), u = r.cloneNode(!0), i = document.createElement("div"), t;
    return i.id = "printSection",
    i.appendChild(u),
    document.body.insertBefore(i, document.body.firstChild),
    window.print(),
    t = document.getElementById("printSection"),
    t != null && t.parentNode.removeChild(t),
    !0
}
}
