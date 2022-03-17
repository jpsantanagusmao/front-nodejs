import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  @Input() customers = [];

  @Output() deleted = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  showData(){
    return this.customers.length > 0 ? true : false;
  }
  delete(customer){
    this.deleted.emit(customer);
  }

}
