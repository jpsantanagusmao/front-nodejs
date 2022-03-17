import { ProjectService } from './../../project/project.service';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TypeaheadOrder } from 'ngx-bootstrap/typeahead';
import { Observable, Observer } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'city-select',
  templateUrl: './city-select.component.html',
  styleUrls: ['./city-select.component.css']
})
export class CitySelectComponent implements OnInit {

  @Input() MESSAGE_PLACE_HOLDER = 'Informe aqui o município'
  @Input() city;
  
  noResult: boolean;

  @Output() onSelected = new EventEmitter();

  cities$: Observable<any>;

  selected: any;

  @Input() search = new FormControl();

  form = new FormGroup({
    search: this.search
  });

  sortConfig: TypeaheadOrder = {
    direction: 'asc',
    field: 'name'
  };

  constructor(
    private _projectService: ProjectService
  ) {
  }
  loadForm() {
    this.form.controls.search.patchValue(this.city);

  }
  ngOnInit(): void {
    const obj = this;

    this.cities$ = new Observable(
      (observer: Observer<string | undefined>) => {
        observer.next(obj.search.value)
      }
    ).pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(name => {
        return obj._projectService.findCityByName(name).pipe(
        )
      }
      ));
  }

  typeaheadOnBlur(event) {
    this.onSelected.emit(event.item);
  }

  typeaheadNoResults(event: boolean): void {
    this.noResult = event;
  }

  onSelect(event): void {
    this.selected = event.item;
    this.onSelected.emit(event.item);
  }

  onFocused(event) {
    this.onSelected.emit(event.item);
  }

}