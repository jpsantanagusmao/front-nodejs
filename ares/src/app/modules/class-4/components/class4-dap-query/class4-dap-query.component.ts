import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DapService } from 'src/app/shared/components/dap-mda/dap.service';

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

  onReport(ater){
    this._router.navigate(["../service/", ater],  { relativeTo: this._route });
  }
}