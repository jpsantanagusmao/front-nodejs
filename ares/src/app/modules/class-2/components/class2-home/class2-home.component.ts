import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { UserService } from 'src/app/shared/components/user/user.service';

@Component({
  selector: 'app-class2-home',
  templateUrl: './class2-home.component.html',
  styleUrls: ['./class2-home.component.css']
})
export class Class2HomeComponent implements OnInit {

  qtdprojetos$: Observable<any>;
  qtdatd$: Observable<any>;
  qtdcustomers$: Observable<any>;

  loading$: Observable<any>;

  constructor(
    private _userCache: UserCacheService,
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    this._userCache.regRoute().subscribe();
  }

}