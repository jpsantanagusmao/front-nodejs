import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.css']
})
export class DialogConfirmComponent implements OnInit {
 
  @Input() title: string;
  @Input() confirmMessage: string;
  
  @Input() confirmText: string = 'Sim';
  @Input() cancelTxt: string = 'Não';
  
  confirmResult: Subject<boolean>;

  constructor(public bsModalRef: BsModalRef) {}

  
  form: FormGroup;
  
  ngOnInit(): void {
    this.confirmResult = new Subject();
  }
  
  onConfirm(){
    this._confirmAndClose(true);
  }
  
  onClose(){
    this._confirmAndClose(false);
  }

  private _confirmAndClose(value: boolean){
    this.confirmResult.next(value);
    this.bsModalRef.hide();

  }
}