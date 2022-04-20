import { Component, OnInit } from '@angular/core';
import { UserCacheService } from 'src/app/core/user-cache.service';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.css']
})
export class DocumentationComponent implements OnInit {

  constructor(
    private _userCache: UserCacheService
  ) { }

  ngOnInit(): void {
    this._userCache.regRoute().subscribe();
  }

}
