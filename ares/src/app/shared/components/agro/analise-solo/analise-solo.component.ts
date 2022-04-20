import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TIPO_SOLO } from './tbl-p';
import { ModelosCalagem } from './modelo-calagem';
import { CULTURAS } from './tbl-exig-nutricionais';
import { UserCacheService } from 'src/app/core/user-cache.service';

@Component({
  selector: 'analise-solo',
  templateUrl: './analise-solo.component.html',
  styleUrls: ['./analise-solo.component.css']
})
export class AnaliseSoloComponent implements OnInit {

  form: FormGroup;
  formCalcario: FormGroup;

  tipoDeSolo = TIPO_SOLO;
  soloSelected: any;

  nc: any;
  CULTURAS_DATA = CULTURAS;
  culturaSelected: any;

  constructor(
    private _userCache: UserCacheService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.loadForm()
  }

  ngOnInit(): void {
    this._userCache.regRoute().subscribe();
  }
  selectSolo(event) {
    this.soloSelected = this.form.controls.classificacao.value;
  }
  selectCultura(event) {
    this.culturaSelected = event;
    console.log(this.culturaSelected);
  }
  loadForm() {
    this.form = new FormGroup({
      description: new FormControl('', [Validators.required]),
      classificacao: new FormControl('', [Validators.required]),
      cultura: new FormControl('', [Validators.required]),
      ph: new FormControl('', [Validators.required]),
      p: new FormControl('', [Validators.required]),
      k: new FormControl('', [Validators.required]),
      Ca: new FormControl('', [Validators.required]),
      Mg: new FormControl('', [Validators.required]),
      Al: new FormControl('', [Validators.required]),
      H: new FormControl('', [Validators.required]),
      MO: new FormControl('', [Validators.required])
    });
    /*
    this.form = new FormGroup({
      description: new FormControl('',[Validators.required]),
      classificacao: new FormControl('',[Validators.required]),
      cultura: new FormControl('',[Validators.required]),
      ph: new FormControl('4.68',[Validators.required]),
      p: new FormControl('1.21',[Validators.required]),
      k: new FormControl('13.27',[Validators.required]),
      Ca: new FormControl('0.4',[Validators.required]),
      Mg: new FormControl('0.11',[Validators.required]),
      Al: new FormControl('0.19',[Validators.required]),
      H: new FormControl('2.4',[Validators.required]),
      MO: new FormControl('0.46',[Validators.required])
    });
    */
    this.formCalcario = new FormGroup({
    prnt: new FormControl('90', [Validators.required])
  });
  }

  async calcular(){
  //console.log(JSON.stringify(this.form.controls))
  //alert('Desculpe, ainda não implementamos este módulo');
  const ca = this.form.controls['Ca'].value;
  const mg = this.form.controls['Mg'].value;
  const k = this.form.controls['k'].value;
  const h = this.form.controls['H'].value;
  const al = this.form.controls['Al'].value;
  const v2 = this.form.controls['cultura'].value.v;
  const PRNT = undefined;
  this.nc = await ModelosCalagem.saturacaoBases({ ca, mg, k, h, al, v2, PRNT });
  console.log(this.nc);
}
onReport(ater){
  // this._router.navigate(["../service/", ater],  { relativeTo: this._route });
}
}
