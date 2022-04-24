import { ActivatedRoute, Route, Router, Routes } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'sumary-data-panel',
  templateUrl: './sumary-data-panel.component.html',
  styleUrls: ['./sumary-data-panel.component.css']
})
export class SumaryDataPanelComponent implements OnInit {

  qtdprojetos$: Observable<any>;
  qtdatd$: Observable<any>;
  qtdcustomers$: Observable<any>;

  loading$: Observable<any>;
  
  constructor(
    private _userCache: UserCacheService,
    private _userService: UserService,
    private _router:Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const obj = this;
    obj.updatePanel()
    UserService.updatePanel.subscribe(
      updated => obj.updatePanel()
    );
  }

  myprojects(event){
    this._router.navigate(['../../my-projects'], { relativeTo: this.route })
  }
  updatePanel() {

    this.qtdprojetos$ = this._userService.allProjects().pipe(
    );
    this.qtdatd$ = this._userService.allTreatmens().pipe(
    );
    this.qtdcustomers$ = this._userService.allCustomers().pipe(
    );

  }
}
