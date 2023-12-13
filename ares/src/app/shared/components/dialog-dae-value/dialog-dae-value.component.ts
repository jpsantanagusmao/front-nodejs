import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dialog-dae-value',
  templateUrl: './dialog-dae-value.component.html',
  styleUrls: ['./dialog-dae-value.component.css']
})
export class DialogDaeValueComponent implements OnInit {

  @Input() title: string = '';
  @Input() message: string = '';

  @Input() confirmText: string = 'Confirmar';
  @Input() cancelTxt: string = 'Cancelar';
  @Input() valor: Number = 0.0;

  confirmResult: Subject<boolean>;

  form: FormGroup;

  constructor(public bsModalRef: BsModalRef) { 
    this.loadForm()
  }

  ngOnInit(): void {
    this.confirmResult = new Subject();
  }

  onConfirm() {
    const valor = this.form.controls.valor.value;
    this._confirmAndClose(valor);
  }

  onClose() {
    this._confirmAndClose(false);
  }
  loadForm() {
    this.form = new FormGroup({
      valor: new FormControl('', [Validators.required]),
    });
  }
  private _confirmAndClose(value: boolean) {
    this.confirmResult.next(value);
    this.bsModalRef.hide();

  }

}
