import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { kMaxLength } from 'buffer';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dialog-comments',
  templateUrl: './dialog-comments.component.html',
  styleUrls: ['./dialog-comments.component.css']
})
export class DialogCommentsComponent implements OnInit {
  @Input() title: string = 'Encaminhar tarefa';
  @Input() confirmMessage: string;

  @Input() confirmText: string = 'Confirmar';
  @Input() cancelTxt: string = 'Cancelar';

  @Input() idTask: string;
  @Input() task: string;
  @Input() beneficiario: string;

  confirmResult: Subject<any>;

  form: FormGroup;

  //Usuário designado para determinada tarefe
  userDesigned: any = undefined;

  constructor(public bsModalRef: BsModalRef) {

  }
  ngOnInit(): void {
    this.confirmResult = new Subject();
    this._createForm();
  }

  onConfirm() {
    const coment = {
      taskid: this.idTask,
      comments: this.form.controls.comentario.value,
      touser: this.userDesigned,
    }
    if(this.formValid){
      this._confirmAndClose(coment);
    }
  }
  onSelectUserDesigned(value) {

    if (value) {
      this.userDesigned = value.id;
    }

  }
  formValid() {

    if(!this.userDesigned || !this.form.valid){
      return false;
    }

    return true;

  }
  onClose() {
    this._confirmAndClose(false);
  }

  private _confirmAndClose(value: any) {
    this.confirmResult.next(value);
    this.bsModalRef.hide();

  }
  async _createForm() {
    const obj = this;

    this.form = new FormGroup({
      comentario: new FormControl('', [Validators.required, Validators.minLength(15), Validators.maxLength(250)])
    });
  }

}
