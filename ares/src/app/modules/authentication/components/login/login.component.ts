import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationService } from '../../authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  form: FormGroup;

  _loading: boolean = false;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: AuthenticationService
  ) {
    this._loading = false;
  }
  
  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      password: ['', [Validators.required]],
      login: ['', [Validators.required, Validators.minLength(6)]]
    })
  }
  autenticar() {
    const credencial = this.form.value;
    this._loading = true;
    const obj = this;
    this.service.autenticar(credencial).subscribe(
      data=>{
        this._loading = false;
      },
      error=>{
        this._loading = false;
      }
    );
  }
}
