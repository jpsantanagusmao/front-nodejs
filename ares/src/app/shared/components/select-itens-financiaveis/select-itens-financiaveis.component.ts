import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TypeaheadOrder } from 'ngx-bootstrap/typeahead';
import { Observable, Observer } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { TreatmentService } from '../treatment/treatment.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'select-itens-financiaveis',
  templateUrl: './select-itens-financiaveis.component.html',
  styleUrls: ['./select-itens-financiaveis.component.css']
})
export class SelectItensFinanciaveisComponent implements OnInit {

  @Input() MESSAGE_PLACE_HOLDER = 'Item a financiar'

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
    field: 'descricao'
  };

  constructor(
    private _userService: UserService,
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
        return obj._userService.findbyitensdescription(ref).pipe(
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

