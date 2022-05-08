import { UserService } from 'src/app/shared/components/user/user.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserCacheService } from 'src/app/core/user-cache.service';

@Component({
  selector: 'agro-indicadores',
  templateUrl: './agro-indicadores.component.html',
  styleUrls: ['./agro-indicadores.component.css']
})
export class AgroIndicadoresComponent implements OnInit {
  @ViewChild("leite", { static: true })cepealeite: ElementRef;
  @ViewChild("boigordo", { static: true })cepeaboi: ElementRef;
  @ViewChild("bezerro", { static: true })cepeabezerro: ElementRef;
  @ViewChild("milho", { static: true })cepeamilho: ElementRef;
  
  indicadoresCepea$: Observable<any>;
  
  constructor(
    private _userCache: UserCacheService,
    private _userService: UserService
  ) { }
  async cepeaBoiChart(){

    const obj = this;
    const dados = await this._userService.getCepeaBoi()
    .subscribe(
      data=>{
        obj.drawChartLine(data, obj.cepeaboi);
        
      }
    );
  }
  async cepeaMilhoChart(){

    const obj = this;
    const dados = await this._userService.getCepeaMilho()
    .subscribe(
      data=>{
        obj.drawChartLine(data, obj.cepeamilho);
      }
    );
  }
  async cepeaBezerroChart(){

    const obj = this;
    const dados = await this._userService.getCepeaBezerro()
    .subscribe(
      data=>{
        obj.drawChartLine(data, obj.cepeabezerro);
      }
    );
  }
  async cepeaLeiteMgChart(){

    const obj = this;
    const dados = await this._userService.getCepeaLeiteMg()
    .subscribe(
      data=>{
        obj.drawChartLine(data, obj.cepealeite);
      }
    );
  }
  drawChartLine(dataset, canvas){
    const x = dataset.dados.map(v=>v.Ano);
    const y = dataset.dados.map(v=>v.Valor_R$);
      const data = {
        labels: x,
        datasets: [{
          label: dataset.titulo,
          backgroundColor: 'rgb(13, 110, 253)',
          borderColor: 'rgb(13, 110, 253)',
          data: y,
        }]
      };

      Chart.register(...registerables);
      new Chart(
        canvas.nativeElement, {
          type: 'line',
          data,
          options: {}
        }
      );

  }
  ngOnInit(): void {
    this._userCache.regRoute().subscribe();
    this.cepeaLeiteMgChart();
    this.cepeaBoiChart();
    this.cepeaBezerroChart();
    this.cepeaMilhoChart();
    this.indicadoresCepea$ = this._userService.getIndicadoresCepea().pipe(
    );
  }

}