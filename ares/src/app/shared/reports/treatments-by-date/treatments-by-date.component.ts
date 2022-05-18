import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Observable } from 'rxjs';
import { tap, switchMap, map, filter, distinctUntilChanged, take } from 'rxjs/operators';
import { UserService } from '../../components/user/user.service';
import { AlertMessagesService } from '../../services/alert-messages.service';

@Component({
  selector: 'app-treatments-by-date',
  templateUrl: './treatments-by-date.component.html',
  styleUrls: ['./treatments-by-date.component.css']
})
export class TreatmentsByDateComponent implements OnInit {
  datePickerConfig: Partial<BsDatepickerConfig>;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  minDate = new Date();

  form: FormGroup;

  treatments$: Observable<any>;

  constructor(
    private _userService: UserService,
    private _messageService: AlertMessagesService
  ) {
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.loadForm();
  }
  loadForm() {
    this.form = new FormGroup({
      localizar: new FormControl(''),
      bsRangeValue: new FormControl('', [Validators.required])
    });
  }
  fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
  }
  async copyValue(value) {
    if (!navigator.clipboard) {
      this.fallbackCopyTextToClipboard(value);
      return;
    }
    navigator.clipboard.writeText(value).then(function () {
      console.log('Async: Copying to clipboard was successful!');
    }, function (err) {
      console.error('Async: Could not copy text: ', err);
    });

    /*
    console.log(value);
    navigator.clipboard.writeText(value);
  
    try {
      await navigator.clipboard.writeText(value);
      alert('CPF copied to clipboard');
    } catch (err) {
      alert(err);
    }
    */
  }

  find() {

    if (!this.form.valid) {
      this._messageService.handleError('Erro', 'Você precisa especificar um período!');
    } else {
      this.treatments$ = this._userService.getTreatmentsByDate([...this.form.controls.bsRangeValue.value]).pipe(
      );
    }
  }
  async filterAdvanced(event) {
    const obj = this;
    if (!this.treatments$) {
      return;
    }

    this.treatments$ = await this.treatments$.pipe(
      filter(value => value.length > 0),
      distinctUntilChanged(),
      map(ds => ds.filter(tr => {
        if (
          (tr.customer.toLowerCase().includes(obj.form.controls.localizar.value.toLowerCase()))
          || (tr.status.toLowerCase().includes(obj.form.controls.localizar.value.toLowerCase()))
          || (tr.local.toLowerCase().includes(obj.form.controls.localizar.value.toLowerCase()))
          || (tr.user.toLowerCase().includes(obj.form.controls.localizar.value.toLowerCase()))
          || (tr.description.toLowerCase().includes(obj.form.controls.localizar.value.toLowerCase()))
        ) {
          return tr;
        }
      })
      )
    );

  }
  ngOnInit(): void {
    this.datePickerConfig = Object.assign({}, {
      containerClass: 'theme-dark-blue',
      rangeInputFormat: 'D/MM/YYYY', isAnimated: true
    });
  }
}