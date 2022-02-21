import { Observable } from 'rxjs';
import { RoleService } from './../role.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'role-select',
  templateUrl: './role-select.component.html',
  styleUrls: ['./role-select.component.css']
})
export class RoleSelectComponent implements OnInit {

  roles$: Observable<any>;
  
  @Output() selected = new EventEmitter();
  
  constructor(
    private roleService: RoleService
  ) { }

  ngOnInit(): void {
    this.roles$ = this.roleService.findAll();
  }
  onSelect(value){
    const id = value.target.value;
    this.selected.emit(id);
  }
}
