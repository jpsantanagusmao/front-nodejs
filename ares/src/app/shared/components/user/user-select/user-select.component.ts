import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'user-select',
  templateUrl: './user-select.component.html',
  styleUrls: ['./user-select.component.css']
})
export class UserSelectComponent implements OnInit {

  users$: Observable<any>;
  
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.users$ = this.userService.findAll();
  }
}
