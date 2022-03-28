import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-class4-perda-de-carga-calc',
  templateUrl: './class4-perda-de-carga-calc.component.html',
  styleUrls: ['./class4-perda-de-carga-calc.component.css']
})
export class Class4PerdaDeCargaCalcComponent implements OnInit {

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }
  onCreateTreatment(event){
    this._router.navigate(["../service/"],  { relativeTo: this._route });
  }
}
