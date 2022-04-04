import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-class4-users-all',
  templateUrl: './class4-users-all.component.html',
  styleUrls: ['./class4-users-all.component.css']
})
export class Class4UsersAllComponent implements OnInit {

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
  }
  onCreateUser(event){
    this._router.navigate(['./users/private/class4/cadastrar']);
  }
}

