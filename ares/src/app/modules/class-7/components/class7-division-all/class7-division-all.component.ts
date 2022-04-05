import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-class7-division-all',
  templateUrl: './class7-division-all.component.html',
  styleUrls: ['./class7-division-all.component.css']
})
export class Class7DivisionAllComponent implements OnInit {

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
  }
  onCreateNew(event) {
    this._router.navigate(['./users/private/class7/division-cadastrar']);
  }
}
