import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { TreatmentService } from 'src/app/shared/components/treatment/treatment.service';
import { UserService } from 'src/app/shared/components/user/user.service';
import { AterModel } from 'src/app/shared/models/ater.model';
import { AlertMessagesService } from 'src/app/shared/services/alert-messages.service';

@Component({
  selector: 'app-class4-cadastrar-treatment',
  templateUrl: './class4-cadastrar-treatment.component.html',
  styleUrls: ['./class4-cadastrar-treatment.component.css']
})
export class Class4CadastrarTreatmentComponent implements OnInit {

  ater: AterModel;

  constructor(
    private _treatmentService: TreatmentService,
    private _usercache: UserCacheService,
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _messageService: AlertMessagesService,

  ) { }

  ngOnInit(): void {

  }
  onStore(treatment) {

    const file = treatment?.rater;

    const formData: FormData = new FormData();
    
    formData.append('treatment', JSON.stringify(treatment));
    formData.append('rater', file);

    this._treatmentService.create(formData).subscribe(
      data=>{
        this._messageService.handleSuccess('Sucesso', 'Cadastro de atendimentos realizado.');
        this._usercache.gotoHome();
      },
      error=>{
        this._messageService.handleError('Erro', 'Erro ao realizar este cadastro');

      }
    );
  }
}
