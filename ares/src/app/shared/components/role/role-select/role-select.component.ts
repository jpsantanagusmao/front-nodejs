import { Observable } from 'rxjs';
import { RoleService } from './../role.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'role-select',
  templateUrl: './role-select.component.html',
  styleUrls: ['./role-select.component.css']
})
export class RoleSelectComponent implements OnInit {

  roles$: Observable<any>;

  constructor(
    private roleService: RoleService
  ) { }

  ngOnInit(): void {
    this.roles$ = this.roleService.findAll();
  }

}
