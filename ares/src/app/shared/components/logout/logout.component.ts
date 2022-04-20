import { Component, OnInit } from '@angular/core';
import { UserCacheService } from 'src/app/core/user-cache.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private userCacheService: UserCacheService
  ) { }

  ngOnInit(): void {
    this.userCacheService.regRoute().subscribe();
    this.logout();
  }
  logout(){
    this.userCacheService.logout();
  }
}
