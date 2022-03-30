import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-class4-dim-capineira',
  templateUrl: './class4-dim-capineira.component.html',
  styleUrls: ['./class4-dim-capineira.component.css']
})
export class Class4DimCapineiraComponent implements OnInit {

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
