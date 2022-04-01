import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
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
    private _userService: UserService
  ) { }

  ngOnInit(): void {

    this.qtdprojetos$ = this._userService.allProjects().pipe(
    );
    this.qtdatd$ = this._userService.allTreatmens().pipe(
      );
      this.qtdcustomers$ = this._userService.allCustomers().pipe(
    );
  }
}