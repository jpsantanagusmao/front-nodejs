import { DivisionService } from './../division.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'division-select',
  templateUrl: './division-select.component.html',
  styleUrls: ['./division-select.component.css']
})
export class DivisionSelectComponent implements OnInit {

  divisions$: Observable<any>;

  constructor(
    private divisionService: DivisionService
  ) { }

  ngOnInit(): void {
    this.divisions$ = this.divisionService.findAll();
  }

}
