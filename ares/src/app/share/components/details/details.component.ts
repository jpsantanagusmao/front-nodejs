import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { UserService } from 'src/app/shared/components/user/user.service';
import { AlertMessagesService } from 'src/app/shared/services/alert-messages.service';
import { tap, delay } from 'rxjs/operators';
import { Observable, pipe } from 'rxjs';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  tasks$: Observable<any>;

  projects$: Observable<any>;

  constructor(
    private _route: ActivatedRoute,
    private _userCache: UserCacheService,
    private _userService: UserService,
    private _messageService: AlertMessagesService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    let id = this._route.snapshot.queryParamMap.get('id')
    const obj = this;

    this.tasks$ = this._userService.tasksByTreatment(id)
      .pipe(
        // tap(console.log)
      );

    this.projects$ = this._userService.projectsCrByTreatment(id)
      .pipe(
        // tap(console.log)
      );

  }

}
