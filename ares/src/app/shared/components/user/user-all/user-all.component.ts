import { Observable } from 'rxjs';
import { UserService } from 'src/app/shared/components/user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-all',
  templateUrl: './user-all.component.html',
  styleUrls: ['./user-all.component.css']
})
export class UserAllComponent implements OnInit {

  users$: Observable<any>;
  _loading: boolean = false;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(){
    this.users$ = this.userService.findAll();
  }
  onMail(value){
    this.userService.resendLogin(value);
  }
  onEdit(value){
    this.userService.update(value);
  }
  onLock(value){
    this.userService.lockUser(value);
  }
  onExtend(value){
    this.userService.extendUser(value);
  }
}
