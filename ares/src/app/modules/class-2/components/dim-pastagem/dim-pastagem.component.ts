import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dim-pastagem',
  templateUrl: './dim-pastagem.component.html',
  styleUrls: ['./dim-pastagem.component.css']
})
export class Class2DimPastagemComponent implements OnInit {

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
 