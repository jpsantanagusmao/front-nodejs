import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'dialog-rater',
  templateUrl: './dialog-rater.component.html',
  styleUrls: ['./dialog-rater.component.css']
})
export class DialogRaterComponent implements OnInit {

  @Input() title: string = 'Relatório de Assist. Técnica';
  @Input() confirmMessage: string;

  @Input() confirmText: string = 'Cofirmar';
  @Input() cancelTxt: string = 'Cancelar';

  @Input() situacaoTxt: string;
  @Input() orientacaoTxt: string;
  @Input() recomendacaoTxt: string;
  @Input() origin: string;

  confirmResult: Subject<boolean>;

  form: FormGroup;

  constructor(public bsModalRef: BsModalRef) {

  }

  async _getRater() {
    const s = await this.situacaoTxt;
    const o = await this.orientacaoTxt;
    const r = await this.recomendacaoTxt;
    const or = await this.origin;

    return { situacao: s, orientacao: o, recomendacao: r, origin: or };
  }
  ngOnInit(): void {
    this.confirmResult = new Subject();
    this._createForm();
  }
  async _createForm() {
    const obj = this;

    this.form = new FormGroup({
      situacao: new FormControl('', [Validators.required, Validators.minLength(100)]),
      orientacao: new FormControl('', [Validators.required, Validators.minLength(100)]),
      recomendacao: new FormControl('', [Validators.required, Validators.minLength(100)])
    });
    this.setForm();
  }
  setForm() {
    this.form.controls.situacao.patchValue(this.situacaoTxt);
    this.form.controls.orientacao.patchValue(this.orientacaoTxt);
    this.form.controls.recomendacao.patchValue(this.recomendacaoTxt);
  }
  onCopy() {

    const rater = {
      situacao: this.form.controls.situacao.value,
      orientacao: this.form.controls.orientacao.value,
      recomendacao: this.form.controls.recomendacao.value,
      origin: this.origin
    }

    const ratertxt = `Situação atual: 
${rater.situacao}
Orientações:
${rater.orientacao}

Recomendações:
${rater.recomendacao}`;

    navigator.clipboard.writeText(ratertxt).then(
      (txt) => {
        alert('O conteúdo foi copiado, agora é só utilizar ctrl+v e colar no seu formulário.')
        this._confirmAndClose(rater);
      }
    );
  }
  onConfirm() {
    const rater = {
      situacao: this.form.controls.situacao.value,
      orientacao: this.form.controls.orientacao.value,
      recomendacao: this.form.controls.recomendacao.value,
      origin: this.origin
    }
    this._confirmAndClose(rater);
  }
  formValid() {
    if (
      (this.form.controls.situacao.dirty)
      && (this.form.controls.orientacao.dirty)
      && (this.form.controls.recomendacao.dirty)
    ) {
      return true;
    }
    return false;
  }
  onClose() {
    this._confirmAndClose(false);
  }

  private _confirmAndClose(value: any) {
    this.confirmResult.next(value);
    this.bsModalRef.hide();

  }

}
