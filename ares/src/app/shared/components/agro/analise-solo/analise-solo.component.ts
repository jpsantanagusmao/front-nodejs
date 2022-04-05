import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'analise-solo',
  templateUrl: './analise-solo.component.html',
  styleUrls: ['./analise-solo.component.css']
})
export class AnaliseSoloComponent implements OnInit {

  form: FormGroup;
  
  constructor(
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadForm()
  }
  loadForm(){
    this.form = new FormGroup({
      description: new FormControl('',[Validators.required]),
      ph: new FormControl('',[Validators.required]),
      p: new FormControl('',[Validators.required]),
      k: new FormControl('',[Validators.required]),
      Ca: new FormControl('',[Validators.required]),
      Mg: new FormControl('',[Validators.required]),
      Al: new FormControl('',[Validators.required]),
      H: new FormControl('',[Validators.required]),
      MO: new FormControl('',[Validators.required])
    });
  }

  calcular(){

  }
  onReport(ater){
    this._router.navigate(["../service/", ater],  { relativeTo: this._route });
  }
}
