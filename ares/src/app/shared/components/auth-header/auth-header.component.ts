import { Component, Input, OnInit } from '@angular/core';

import * as moment from 'moment';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'auth-header',
  templateUrl: './auth-header.component.html',
  styleUrls: ['./auth-header.component.css']
})
export class AuthHeaderComponent implements OnInit {

  @Input() partner: string = 'Prefeitura Municipal de Itinga';
  @Input() division: string = 'Secretaria Municipal de Agricultura';
  @Input() username:string = 'João Paulo Santana Gusmão';
  timeRemaining: string = '';
  
  expiresIn: any;

  user: UserModel;

  constructor(
    private userCacheService: UserCacheService
  ) { 
    /**
     * Data de expiração definida no token JWT
     */
    const user = this.userCacheService.getUserData();
    this.expiresIn = moment(user.expiresIn);
    
    setInterval(this.getRegistry, 1000)
  }
  getRegistry(){
    const datelimit = moment("14/02/2022 18:25:31", "DD/MM/YYYY HH:mm:ss");
    const date = moment();
    let ms = moment(datelimit).diff(moment(date));
    //let ms = moment(this.expiresIn).diff(moment(date));
    let d = moment.duration(ms);
    let s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
    let time = s.split(':');
    this.timeRemaining = `${time[0]}h ${time[1]}m ${time[2]}s`;
    console.log(this.timeRemaining);
    /*
    */
  }
  ngOnInit(): void {

  }

  gotoHome(){}

  gotoContact(){}

  gotoAbout(){}
}
