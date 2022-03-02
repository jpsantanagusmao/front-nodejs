import { Observable } from 'rxjs';
import { RoleService } from './../role.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'role-select',
  templateUrl: './role-select.component.html',
  styleUrls: ['./role-select.component.css']
})
export class RoleSelectComponent implements OnInit {

  roles$: Observable<any>;

  @Input() roleSelected: any;

  @Output() selected = new EventEmitter();

  constructor(
    private roleService: RoleService
  ) { }

  ngOnInit(): void {
    this.roles$ = this.roleService.findAll();

    if (this.roleSelected == undefined) {
      this.roleSelected = { id: '', type: 'Selecione uma permissão' };
    }else{
      this.selected.emit(this.roleSelected.id);
    }
  }
  onSelect(value) {
    const id = value.target.value;
    this.selected.emit(id);
  }
}
