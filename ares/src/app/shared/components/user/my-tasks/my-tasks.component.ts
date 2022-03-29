import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.css']
})
export class MyTasksComponent implements OnInit {

  tasks$: Observable<any>;
  
  constructor(
    private _userService: UserService
  ) { 
  }
  
  ngOnInit(): void {
    this.tasks$ = this._userService.myTasks().pipe(
    );
  }

}
