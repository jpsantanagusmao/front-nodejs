import { DapService } from './../dap.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Component({
  selector: 'dap-web',
  templateUrl: './dap-web.component.html',
  styleUrls: ['./dap-web.component.css']
})
export class DapWebComponent implements OnInit {

  @Output() onReport = new EventEmitter();

  form: FormGroup;

  _loading: boolean = Boolean(false);

  dap$: Observable<any>;
  ater: any;

  constructor(
    private _dapService: DapService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      search: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)])
    });
  }
 
  async emitReport() {
    /**
 * Consulta irregularidades
 */
    const cpf = this.form.controls.search.value;
    const obj = this;

    await this.loadingToggle();

    this.dap$ = this._dapService.findByCpf(cpf).pipe(
      tap((d)=>{
        obj.loadingToggle()
      })
    );
    
  }
 
  async loadingToggle() {
    this._loading = !(Boolean(this._loading));
  }

  registerTreatment(dap) {
    console.log(dap);
  }
}

 