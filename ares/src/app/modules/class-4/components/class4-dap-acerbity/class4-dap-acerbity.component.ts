import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DapService } from 'src/app/shared/components/dap-mda/dap.service';

@Component({
  selector: 'app-class4-dap-acerbity',
  templateUrl: './class4-dap-acerbity.component.html',
  styleUrls: ['./class4-dap-acerbity.component.css']
})
export class Class4DapAcerbityComponent implements OnInit {

  
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _dapService: DapService
  ) { }

  ngOnInit(): void {
    
  }

  onReport(ater){
    this._router.navigate(["../service"],  { relativeTo: this._route });
  }
}