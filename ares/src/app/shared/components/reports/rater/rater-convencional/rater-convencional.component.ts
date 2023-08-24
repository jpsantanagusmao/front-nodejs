
import { Component, ElementRef,  OnInit,  ViewChild } from '@angular/core';
import { Location } from '@angular/common';

import { jsPDF } from 'jspdf';

import { UserCacheService } from 'src/app/core/user-cache.service';
import { RaterPnaeModel } from '../pnae2023-rater/rater-model';

@Component({
  selector: 'app-rater-conv',
  templateUrl: './rater-convencional.component.html',
  styleUrls: ['./rater-convencional.component.css']
})
export class RaterConvencionalComponent implements OnInit {

  @ViewChild('rater', { static: false }) el!: ElementRef;
  
    
  rater: any = undefined;

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
  local = undefined;
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
    this.local = this.rater.local;
    this.FILE_NAME = 'Relatorio de ATER - ' + this.agricultor;

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