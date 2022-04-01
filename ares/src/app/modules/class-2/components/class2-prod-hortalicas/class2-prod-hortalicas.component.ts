import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-class2-prod-hortalicas',
  templateUrl: './class2-prod-hortalicas.component.html',
  styleUrls: ['./class2-prod-hortalicas.component.css']
})
export class Class2ProdHortalicasComponent implements OnInit {

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
