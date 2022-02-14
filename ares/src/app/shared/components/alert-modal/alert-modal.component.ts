import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent implements OnInit {

  public static readonly SUCCESS = 'success';
  public static readonly WARNING = 'warning';
  public static readonly INFO = 'info';
  public static readonly DANGER = 'danger';

  @Input() message: string = '';
  @Input() title: string = '';
  /**
   * info | success | warning | danger
   */
  @Input() type: string = 'success';
  @Input() timeout: number = 3000;

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(): void {
    setInterval(()=>{
      this.onClose();
    },this.timeout)
  }
  onClose(){
    this.bsModalRef.hide();
  }
}
