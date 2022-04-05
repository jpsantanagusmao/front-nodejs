import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-class7-users-all',
  templateUrl: './class7-users-all.component.html',
  styleUrls: ['./class7-users-all.component.css']
})
export class Class7UsersAllComponent implements OnInit {

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
  }
  onCreateNew(event){
    this._router.navigate(['./users/private/class7/cadastrar']);
  }
}
