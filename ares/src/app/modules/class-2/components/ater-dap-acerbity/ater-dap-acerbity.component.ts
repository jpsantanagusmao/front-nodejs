import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DapService } from 'src/app/shared/components/dap-mda/dap.service';

@Component({
  selector: 'app-ater-dap-acerbity',
  templateUrl: './ater-dap-acerbity.component.html',
  styleUrls: ['./ater-dap-acerbity.component.css']
})
export class Class2AterDapAcerbityComponent implements OnInit {

  
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