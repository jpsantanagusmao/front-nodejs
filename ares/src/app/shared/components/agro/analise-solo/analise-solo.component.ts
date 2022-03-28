import { DapService } from './../../dap-mda/dap.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'analise-solo',
  templateUrl: './analise-solo.component.html',
  styleUrls: ['./analise-solo.component.css']
})
export class AnaliseSoloComponent implements OnInit {

  
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
