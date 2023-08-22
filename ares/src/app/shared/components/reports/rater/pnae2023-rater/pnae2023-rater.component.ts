import { Component, ElementRef,  OnInit,  ViewChild } from '@angular/core';
import { Location } from '@angular/common';

import { jsPDF } from 'jspdf';
import { RaterPnaeModel } from './rater-model';
import { UserCacheService } from 'src/app/core/user-cache.service';

@Component({
  selector: 'app-pnae2023-rater',
  templateUrl: './pnae2023-rater.component.html',
  styleUrls: ['./pnae2023-rater.component.css']
})
export class Pnae2023RaterComponent implements OnInit {

  @ViewChild('rater', { static: false }) el!: ElementRef;
  
    
  rater: RaterPnaeModel = undefined;

  agricultor = undefined;
  cpfaf = undefined;
  dap = undefined;
  municipio = undefined;
  numvisita = undefined;
  data = undefined;
  extensionista = undefined;
  matricula = undefined;
  assunto = undefined;
  situacao = undefined;
  orientacao = undefined;
  recomendacao = undefined;
  FILE_NAME = undefined;

  constructor(

    private _userCache: UserCacheService,
    private _location: Location

  ) { }

  async ngAfterViewInit() {

    this.rater = await JSON.parse(this._userCache.getAterpnae());

    await this._setupAter();
    console.log(this.rater);

  }
  _setupAter() {

    this.agricultor = this.rater.agricultor;
    this.cpfaf = this.rater.cpfaf;
    this.dap = this.rater.dap;
    this.municipio = this.rater.municipio;
    this.numvisita = this.rater.numvisita;
    this.data = this.rater.data;
    this.extensionista = this.rater.extensionista;
    this.matricula = this.rater.matricula;
    this.assunto = this.rater.assunto;
    this.situacao = this.rater.situacao;
    this.orientacao = this.rater.orientacao;
    this.recomendacao = this.rater.recomendacao;
    this.FILE_NAME = 'RATER-PNAE - ' + this.agricultor + ' - V' + this.numvisita;

  }

  async ngOnInit() {


  }

  async _print() {
    const doc = new jsPDF('p', 'pt', 'a4');
    await doc.html(this.el.nativeElement, {
      callback: (doc) => {
        doc.save(`${this.FILE_NAME}.pdf`); // will save the file in the current working directory
      }
    });
  
  }

  ngOnDestroy(): void {
    this._userCache.removeAterpnae();
  }
}
