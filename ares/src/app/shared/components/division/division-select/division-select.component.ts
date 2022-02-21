import { DivisionService } from './../division.service';
import { Observable } from 'rxjs';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'division-select',
  templateUrl: './division-select.component.html',
  styleUrls: ['./division-select.component.css']
})
export class DivisionSelectComponent implements OnInit {

  divisions$: Observable<any>;

  @Output() selected = new EventEmitter();

  constructor(
    private divisionService: DivisionService
  ) { }
 
  ngOnInit(): void {
    this.divisions$ = this.divisionService.findAll();
  }

  onSelect(value){
    const id = value.target.value;
    this.selected.emit(id);
  }
}
