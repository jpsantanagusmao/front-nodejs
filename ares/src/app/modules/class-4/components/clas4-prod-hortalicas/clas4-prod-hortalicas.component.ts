import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-clas4-prod-hortalicas',
  templateUrl: './clas4-prod-hortalicas.component.html',
  styleUrls: ['./clas4-prod-hortalicas.component.css']
})
export class Clas4ProdHortalicasComponent implements OnInit {
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
