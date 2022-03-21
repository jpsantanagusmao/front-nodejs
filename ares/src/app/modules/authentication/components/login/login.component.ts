import { AuthenticationService } from '../../authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AlertMessagesService } from 'src/app/shared/services/alert-messages.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  form: FormGroup;

  _loading: boolean = false;
   
  bsModalRef: BsModalRef;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: AuthenticationService,
    private usercache: UserCacheService,
    private messageService: AlertMessagesService
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
       obj._loading = false;
       obj.usercache.decode(data);
       //this.messageService.handleSuccess('Login com sucesso', 'Login efetuado com sucesso');
      },
      error=>{
        obj._loading = false;
        //const erromsg = error.error;
        //console.error(erromsg);
        //this.messageService.handleError(erromsg.name, erromsg.message);
      }

    );
  }
}
