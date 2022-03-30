import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-class4-dim-pastagem',
  templateUrl: './class4-dim-pastagem.component.html',
  styleUrls: ['./class4-dim-pastagem.component.css']
})
export class Class4DimPastagemComponent implements OnInit {

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