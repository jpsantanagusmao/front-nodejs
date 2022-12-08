import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { CarServiceService } from 'src/app/shared/services/car-service.service';

@Component({
  selector: 'app-find-car',
  templateUrl: './find-car.component.html',
  styleUrls: ['./find-car.component.css']
})
export class FindCarComponent implements OnInit {

  data: string = '';
  form: FormGroup;

  _loading: boolean = Boolean(false);
  car$: Observable<any>;

  constructor(
    private _userCache: UserCacheService,
    private _carservice: CarServiceService
  ) { }

  ngOnInit(): void {
    this._userCache.regRoute().subscribe();
    this.form = new FormGroup({
      search: new FormControl('')
    });
  }

  async emitSearch() {
    //    await this.loadingToggle();
    const obj = this;
    const formData: FormData = new FormData();
    
    formData.append('data', this.form.controls.search.value);
    this._carservice.findCar(this.form.controls.search.value).subscribe(
      data=>{
        obj.car$ = data;
      },
      error=>{
        console.log('error');
        console.error(error);

      }
    );
  }
  async loadingToggle() {
    this._loading = !(Boolean(this._loading));
  }
}
