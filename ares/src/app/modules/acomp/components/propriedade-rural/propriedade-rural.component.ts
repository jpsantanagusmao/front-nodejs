import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VISITAS, visitaAter } from '../../models/visitas-ater';

@Component({
  selector: 'app-propriedade-rural',
  templateUrl: './propriedade-rural.component.html',
  styleUrls: ['./propriedade-rural.component.css']
})
export class PropriedadeRuralComponent implements OnInit {

  visitas: visitaAter[] = VISITAS
  info: visitaAter;

  constructor(
    private _route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id');

    this.info = this.visitas.find((obj) => {
      return obj.id === id
    })
  }

}
 