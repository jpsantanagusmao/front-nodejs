import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-calc-irrigacaocalc-irrigacao',
  templateUrl: './calc-irrigacaocalc-irrigacao.component.html',
  styleUrls: ['./calc-irrigacaocalc-irrigacao.component.css']
})
export class Class2PerdaDeCargaCalcComponent implements OnInit {

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
