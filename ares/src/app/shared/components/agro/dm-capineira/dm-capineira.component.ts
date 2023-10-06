import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCacheService } from 'src/app/core/user-cache.service';

import { RebanhoModel } from '../dm-pastagens/rebanho-model';
import { CapineiraModel, CULTURAS } from './capineira-model';

@Component({
  selector: 'dm-capineira',
  templateUrl: './dm-capineira.component.html',
  styleUrls: ['./dm-capineira.component.css']
})
export class DmCapineiraComponent implements OnInit {

  @Output() onReport = new EventEmitter();

  rebanho: RebanhoModel[] = [];

  culturaSelected: CapineiraModel;
  culturas: CapineiraModel[] = [];

  form: FormGroup;

  private _areaPiquete: number;
  private _qtdPiquetes: number;
  private _lotacao: number;
  private _consumoAnual: number;
  private _pastagem: string;

  private readonly CONSUMO_FORRAGEM: Number = 2.5;

  constructor(
    private fb: FormBuilder,
    private _userCache: UserCacheService,
    private router: Router,
  ) {
    this.culturas = CULTURAS;
  }

  incluir(value: any) {

  }
  remove(value: any) {
    this.rebanho = value;
  }

  ngOnInit(): void {
    this._userCache.regRoute().subscribe();
    this.form = this.fb.group({
      pasto: ['Mombaça', Validators.required],
      ocupacao: ['1', Validators.required],
      aguas: ['210', Validators.required],
    });

  }
  dadosok() {

    if ((this.rebanho.length > 0) && (this.form.valid)) {
      return true;
    }

    return false;
  }
}