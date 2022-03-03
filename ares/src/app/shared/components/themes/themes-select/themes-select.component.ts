import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemesService } from '../themes.service';

@Component({
  selector: 'themes-select',
  templateUrl: './themes-select.component.html',
  styleUrls: ['./themes-select.component.css']
})
export class ThemesSelectComponent implements OnInit {

  themes$: Observable<any>;

  @Input() themeSelected: any;

  @Output() selected = new EventEmitter();

  constructor(
    private _themeService: ThemesService
  ) { }

  ngOnInit(): void {
    if (this.themeSelected == undefined) {
      this.themeSelected = { id: '', class: 'Selecione uma categoria para a divisão de planejamento' };
    } else {
      this.selected.emit(this.themeSelected.id);
    }

    this.themes$ = this._themeService.findAll();
  }

  onSelect(event) {
    const id = event.target.value;
    this.selected.emit(id);
  }
}
