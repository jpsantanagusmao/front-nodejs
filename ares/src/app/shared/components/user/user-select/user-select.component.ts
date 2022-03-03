import { UserService } from './../user.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { TypeaheadConfig, TypeaheadOrder } from 'ngx-bootstrap/typeahead';


// such override allows to keep some initial values
export function getTypeaheadConfig(): TypeaheadConfig {
  return Object.assign(new TypeaheadConfig(), { hideResultsOnBlur: false });
}

@Component({
  selector: 'user-select',
  templateUrl: './user-select.component.html',
  styleUrls: ['./user-select.component.css']
})
export class UserSelectComponent implements OnInit {
  
  @Input() MESSAGE_PLACE_HOLDER = 'Informe aqui'
  
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
    private _userService: UserService
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
      switchMap(name => {
        return obj._userService.findByName(name).pipe(
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