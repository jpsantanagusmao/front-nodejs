import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { UserService } from 'src/app/shared/components/user/user.service';
import { AlertMessagesService } from 'src/app/shared/services/alert-messages.service';
import { tap, delay } from 'rxjs/operators';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  orderObj
  constructor(
    private _route: ActivatedRoute,
    private _userCache: UserCacheService,
    private _userService: UserService,
    private _messageService: AlertMessagesService
  ) { }

  ngOnInit(): void {
    let id = this._route.snapshot.queryParamMap.get('id')
    this.getTasks(id);
    this.getProjetcs(id);
  }
  getTasks(id) {
    this._userService.tasksByTreatment(id).subscribe(
      data=>{
        console.log(data)
      }
    )
    // .pipe(tap(console.log));
    
  }
  getProjetcs(id) {
    this._userService.projectsCrByTreatment(id).pipe(tap(console.log));
  }

}
