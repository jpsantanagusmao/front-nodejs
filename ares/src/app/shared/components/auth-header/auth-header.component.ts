import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { UserModel } from '../../models/user.model';
import { UserService } from '../user/user.service';

@Component({
  selector: 'auth-header',
  templateUrl: './auth-header.component.html',
  styleUrls: ['./auth-header.component.css']
})
export class AuthHeaderComponent implements OnInit {

  partner: string;
  division: string;
  username: string;

  isloading$ = new BehaviorSubject<boolean>(false);

  private _timeRemaining = new BehaviorSubject<any>('0:00:00');
  //private mytasks$ = new BehaviorSubject<any>(0);
  mytasks$: Observable<any>;

  expiresIn: any;

  private _user = new BehaviorSubject<any>({});

  constructor(
    private userCacheService: UserCacheService,
    private _userService: UserService,
    private _router: Router
  ) {
    /**
     * Data de expiração definida no token JWT
     */
    const obj = this
    const data = moment();

    setInterval(function () {

      obj.isloading$.next(false);

      const user = obj.userCacheService.getUserData();
      obj.expiresIn = moment(user?.expiresIn) || data;

      const datelimit = obj.expiresIn;
      const date = moment();

      let ms = moment(datelimit).diff(moment(date));
      let d = moment.duration(ms);
      let s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");


      /**
       * Define os dados do usuário
       */
      obj.partner = user?.partner_name;
      obj.division = user?.division_name;
      obj.username = user?.name;

      obj.isloading$.next(true);
      /**
       * Verifica se o time remaining já expirou e confirma o logout
       */
      if (d.asSeconds() <= 0) {
        obj.logout();
      }

      let time = s.split(':');
      obj._timeRemaining.next(`${time[0]}h ${time[1]}m ${time[2]}s`);
    }, 1000)
  }
  get loading() {
    return this.isloading$;
  }
  viewmytasks(){
    this._router.navigate(['/users/private/my-tasks']);
  }
  get user(): UserModel {
    return this._user.value;
  }
  set user(user: UserModel) {
    this._user.next(user);
  }

  ngOnInit(): void {
    this.mytasks$ = this._userService.countTasks();
  }

  get timeRem() {
    return this._timeRemaining.value;
  }
  set timeRem(value) {
    this._timeRemaining.next(value);
  }

  logout() {
    this.userCacheService.logout();
  }
  gotoHome() { 
    this.userCacheService.gotoHome();
  }

  gotoContact() { }

  gotoAbout() { }
}
