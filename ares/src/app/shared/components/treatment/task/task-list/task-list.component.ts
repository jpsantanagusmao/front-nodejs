import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  @Input() tasks = [];

  @Output() deleted = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  showData(){
    return this.tasks.length > 0 ? true : false;
  }
  delete(task){
    this.deleted.emit(task);
  }
}
