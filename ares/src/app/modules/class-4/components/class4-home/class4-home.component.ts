import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { UserService } from 'src/app/shared/components/user/user.service';

@Component({
  selector: 'app-class4-home',
  templateUrl: './class4-home.component.html',
  styleUrls: ['./class4-home.component.css']
})
export class Class4HomeComponent implements OnInit {

  qtdprojetos$: Observable<any>;
  qtdatd$: Observable<any>;
  qtdcustomers$: Observable<any>;

  loading$: Observable<any>;

  constructor(
    private _userService: UserService
  ) { }

  ngOnInit(): void {

    this.qtdprojetos$ = this._userService.allProjects().pipe();
    this.qtdatd$ = this._userService.allTreatmens().pipe();
    this.qtdcustomers$ = this._userService.allCustomers().pipe();
  }

}
