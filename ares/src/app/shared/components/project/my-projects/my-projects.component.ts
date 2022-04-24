import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from './../project.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css']
})
export class MyProjectsComponent implements OnInit {

  projects$: Observable<any>;

  constructor(
    private _projectService: ProjectService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.projects$ = this._projectService.findMyProjects().pipe(
      tap(console.log)
    );
  }
  onselecAction(id: any) {
    this._router.navigate(['../view-actions'], { queryParams: {id}, relativeTo: this._route });
  }
}
