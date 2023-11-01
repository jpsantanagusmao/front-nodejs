import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dim-esterqueira',
  templateUrl: './dim-esterqueira.component.html',
  styleUrls: ['./dim-esterqueira.component.css']
})
export class DimEsterqueiraComponent implements OnInit {

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }
  onCreateTreatment(event) {
    this._router.navigate(["../service/"], { relativeTo: this._route });
  }
}