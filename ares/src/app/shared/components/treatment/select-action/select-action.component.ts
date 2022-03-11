import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TypeaheadOrder } from 'ngx-bootstrap/typeahead';
import { Observable, Observer } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { UserService } from '../../user/user.service';
import { TreatmentService } from '../treatment.service';

@Component({
  selector: 'select-action',
  templateUrl: './select-action.component.html',
  styleUrls: ['./select-action.component.css']
})
export class SelectActionComponent implements OnInit {
  
  @Input() MESSAGE_PLACE_HOLDER = 'Informe aqui o serviço prestado'
  
  noResult: boolean;

  @Output() onSelected = new EventEmitter();

  users$: Observable<any>;

  selected: any;

  search = new FormControl();
  form = new FormGroup({
    search: this.search
  });

  sortConfig: TypeaheadOrder = {
    direction: 'asc',
    field: 'name'
  };

  constructor(
    private _treatmentService: TreatmentService
  ) { }

  ngOnInit(): void {
    const obj = this;

    this.users$ = new Observable(
      (observer: Observer<string | undefined>) => {
        observer.next(obj.search.value)
      }
    ).pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(ref => {
        return obj._treatmentService.findByActionRef(ref).pipe(
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
