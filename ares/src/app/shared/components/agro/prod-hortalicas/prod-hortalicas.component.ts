import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { AterModel } from 'src/app/shared/models/ater.model.js';
import { HORTALICAS } from '../prod-hortalicas/hortalicas.js';

@Component({
  selector: 'prod-hortalicas',
  templateUrl: './prod-hortalicas.component.html',
  styleUrls: ['./prod-hortalicas.component.css']
})
export class ProdHortalicasComponent implements OnInit {


  @Output() onReport = new EventEmitter();

  culturas = HORTALICAS;
  formCalc: FormGroup;

  /* Variáveis a calcular */


  _plantio: any[] = [];

  constructor(
    private fb: FormBuilder,
    private _userCache: UserCacheService
  ) { }

  ngOnInit(): void {
    this.formCalc = this.fb.group({
      cultura: ['', Validators.required],
      demanda: ['', Validators.required]
    });
  }
  async calcular() {
    /* obtem a cultura informada */
    const cultura = await (this.formCalc.get('cultura').value);

    /** Área útil a ser plantada em m2 por intervalo de plantio em semanas */
    /**
     *  area total = (demanda semanal / produtividade * intervalo) / 10000
     * 
     */
    const dem = await Number(this.formCalc.get('demanda').value);
    const area = await (( ((dem / cultura.produtividade) * cultura.intervalo))/10000);

    /** Área total em m2 por intervalo de plantio em semanas */
    const area_util = 0;

    /** Área de reserva em m2 por ciclo */
    const area_reserva = 0;

    /* Abrindo modal para exibir os dados */
    this._plantio.push({
      cultura: (this.formCalc.get('cultura').value).cultura,
      area: area,
      data: '',
    });
    console.log(JSON.stringify(this._plantio));
    /* finalizando os cálculo */
  }
 
  delete(t) {
    this._plantio.splice(this._plantio.indexOf(t), 1);
  }
  createTreatment() {

    let situacao = `
    Foi solicitado pelo requerente, um dimensionamento de um sistema de irrigação po forma que atenda a demanda hídrica para a cultura estabelecida.
    `;

    const local = '';
    const customers = [];
    const orientacao = `
    Com o modelo descrito de acordo com as preferências do produtor, o sistema necessita de um conjunto motobomba com potênciapaz de fornecer uma s de água por hora a uma altura manométrca.
    `;
    const recomendacao = `
    - Obter do órgão competente as devidas licencas para instalação e funcionamento deste sistema; - Certificar-se da oferta/dispnibilidade de água e energia no local da captação para atender o sistema.
    `;

    const ater: AterModel = {
      local, customers, situacao, orientacao, recomendacao
    };
    /**
     * Registra a ater no cookie
     */
    this._userCache.createAter(JSON.stringify(ater));
    //this.onReport.emit(true);

  }
}
