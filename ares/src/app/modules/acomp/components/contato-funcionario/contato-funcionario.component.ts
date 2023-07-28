import { Component, OnInit } from '@angular/core';
import { COLABORARORES, colaborador } from '../../models/colab';
import { ActivatedRoute } from '@angular/router';

import * as moment from 'moment';

@Component({
  selector: 'app-contato-funcionario',
  templateUrl: './contato-funcionario.component.html',
  styleUrls: ['./contato-funcionario.component.css']
})
export class ContatoFuncionarioComponent implements OnInit {

  colabs = COLABORARORES;
  info: colaborador;
  expressaozap: string;

  constructor(
    private _route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id');

    this.info = this.colabs.find((obj) => {
      // Note que o callback retornará `true` se o objeto
      // atual tiver propriedade `id` igual a 2.
      return obj.id === id
    })
    this._criaExpressao()
  }

  private _criaExpressao(){
    const hora = parseInt(moment().format('H')); 

    let fone = this.info.contato;
    let comp = '';

    comp = hora <= 12? 'Bom%20dia%20': 'Boa%20tarde%20';
    comp = hora >= 18? 'Boa%20Noite%20': 'Boa%20tarde%20';

    fone = fone.replace(/ |\(|\)|\-/g, '')

    let msg = `https://wa.me/55${fone}?text=${comp}preciso%20da%20sua%20orientação.`
    this.expressaozap = msg;
    console.log(this.expressaozap);

  }
}
