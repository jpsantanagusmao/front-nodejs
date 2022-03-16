import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TypeaheadOrder } from 'ngx-bootstrap/typeahead';
import { Observable, Observer } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { UserService } from '../../user/user.service';
import { SchoolingService } from '../schooling.service';

@Component({
  selector: 'schooling-select',
  templateUrl: './schooling-select.component.html',
  styleUrls: ['./schooling-select.component.css']
})
export class SchoolingSelectComponent implements OnInit {
  
  @Input() MESSAGE_PLACE_HOLDER = 'Informe a escolaridade';
  
  noResult: boolean;

  @Output() onSelected = new EventEmitter();

  schoolings$: Observable<any>;

  selected: any;

  search = new FormControl();
  form = new FormGroup({
    search: this.search
  });

  sortConfig: TypeaheadOrder = {
    direction: 'asc',
    field: 'schooling'
  };

  constructor(
    private _schoolingService: SchoolingService
  ) { }

  ngOnInit(): void {
    const obj = this;

    this.schoolings$ = new Observable(
      (observer: Observer<string | undefined>) => {
        observer.next(obj.search.value)
      }
    ).pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(name => {
        return obj._schoolingService.findBySchooling(name).pipe(
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
