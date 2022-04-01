import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserService } from '../../components/user/user.service';

@Component({
  selector: 'app-treatments-by-date',
  templateUrl: './treatments-by-date.component.html',
  styleUrls: ['./treatments-by-date.component.css']
})
export class TreatmentsByDateComponent implements OnInit {

  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  minDate = new Date();

  form: FormGroup;

  treatments$: Observable<any>;

  constructor(
    private _userService: UserService
  ) {
     this.minDate.setDate(this.minDate.getDate() - 1);
     this.maxDate.setDate(this.maxDate.getDate() + 7);
     //this.bsRangeValue = [this.bsValue, this.maxDate];
     this.loadForm();
  }
  loadForm(){
    this.form = new FormGroup({
      localizar: new FormControl(''),
      bsRangeValue: new FormControl('')
    });
  }
  find(){

    this.treatments$ = this._userService.getTreatmentsByDate([...this.form.controls.bsRangeValue.value]).pipe(
      tap(console.log)
    );
  }
  ngOnInit(): void {
  }
}