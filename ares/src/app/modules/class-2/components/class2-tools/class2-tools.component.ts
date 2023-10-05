import { Component, OnInit } from '@angular/core';
import { UserCacheService } from 'src/app/core/user-cache.service';

@Component({
  selector: 'app-class2-tools',
  templateUrl: './class2-tools.component.html',
  styleUrls: ['./class2-tools.component.css']
})
export class Class2ToolsComponent implements OnInit {

  constructor(
    private _userCache: UserCacheService
  ) { }
 
  ngOnInit(): void {
    this._userCache.regRoute().subscribe();
  }

}
