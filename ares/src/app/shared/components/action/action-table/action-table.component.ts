import { Action } from './../../project/models';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'action-table',
  templateUrl: './action-table.component.html',
  styleUrls: ['./action-table.component.css']
})
export class ActionTableComponent implements OnInit {
  
  @Input() actions: Action[] = [];

  @Output() deleted = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  showData(){
    return this.actions.length > 0 ? true : false;
  }

  delete(action){
    this.actions = this.actions.filter( el => el !== action );
    this.deleted.emit(this.actions);
  }
}
