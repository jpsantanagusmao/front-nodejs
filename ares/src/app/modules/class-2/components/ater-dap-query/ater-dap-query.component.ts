import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DapService } from 'src/app/shared/components/dap-mda/dap.service';

@Component({
  selector: 'app-ater-dap-query',
  templateUrl: './ater-dap-query.component.html',
  styleUrls: ['./ater-dap-query.component.css']
})
export class Class2DapQueryComponent implements OnInit {
  
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