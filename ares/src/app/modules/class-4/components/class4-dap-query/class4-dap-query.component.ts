import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DapService } from 'src/app/shared/components/dap-mda/dap.service';
import { AterModel } from 'src/app/shared/models/ater.model';

@Component({
  selector: 'app-class4-dap-query',
  templateUrl: './class4-dap-query.component.html',
  styleUrls: ['./class4-dap-query.component.css']
})
export class Class4DapQueryComponent implements OnInit {

  
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _dapService: DapService
  ) { }

  ngOnInit(): void {
    
  }

  onReport(event){
    this._router.navigate(["../service/"],  { relativeTo: this._route });
  }
}