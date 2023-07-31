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
  isopen:boolean = true;


  abre = moment().hour(7).minute(30);
  almoco_sai = moment().hour(11).minute(30);
  almoco_ret = moment().hour(13).minute(30);
  fecha = moment().hour(17).minute(30);
  dia_semana_comeca = moment().day(1);// Segunda-feira
  dia_semana_termina = moment().day(5);// Sexta-feira


  constructor(
    private _route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id');

    this.info = this.colabs.find((obj) => {

      return obj.id === id
    })
    
    if(this._isopen()){
      this._criaExpressao()
    }

  }

  private _isopen() {

    if( ( moment().isAfter(this.abre) //Para estar aberto a hora atual deve ser após de 7:30
        && moment().isBefore(this.almoco_sai) ) //Para estar aberto a hora atual deve antes de 11:30
        || ( (moment().isAfter(this.almoco_ret) //Para estar aberto a hora atual deve ser após 13:30
        && moment().isBefore(this.fecha) ) ) //Para estar aberto a hora atual deve ser antes de 17:30
        && (moment().isAfter(this.dia_semana_comeca) //Para estar aberto o dia da semana deve de segunda-feira(1) em diante
        && moment().isBefore(this.dia_semana_termina)) //Para estar aberto o dia da semana deve ser de sexta-feira(5) para trás
    ){
      this.isopen=true;
    }else{
      this.isopen=false;
    }
    //this.isopen=false;
    
    return this.isopen;

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

  }
}
