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
    console.log(treatment);
    /**
     
{
    "local": "Sitio Vargem Alegre - Córrego Vargem Alegre",
    "data": "2022-03-25",
    "situacao": "O Sr.  Raimundo Lucindo de Souza, proprietario de uma área total de 63.79 hectares no local denominado \"Sitio Vargem Alegre\" possui a DAP de número SDW0308784546911403220105 com validade até 14/03/2024 na qual consta a produção de Bovinos - Leite renda auferida de 12000.00, Bovinos - Carne renda auferida de 22000.00 e Aposentadoria Rural renda auferida de 31512.00.",
    "orientacao": "A DAP - Declaração de Aptidão do PRONAF é utilizada como instrumento de identificação do agricultor familiar para acessar políticas públicas do Governo Federal, e é necessário apresentar no ato da elaboração da DAP os seguintes documentos: \n     CPF - do agricultor (a) familiar e cônjuge;\n Identidade (RG) do agricultor (a) familiar e cônjuge;\n Certidão de casamento;\n Comprovante de residência (conta de energia);\n Contrato de Compra e Venda, Declaração de Posse ou Matrícula do Cartório de\nRegistro de Imóveis dos estabelecimentos rurais beneficiados com o crédito;\n Comprovante de renda dos últimos 12 meses, tais como: notas fiscais de entrada;\nholerite do agricultor (a), cônjuge e agregados (se possuir); recibos;\n    ",
    "recomendacao": "A DAP é um documento de direito do Agricultor Familiar e a emissão da mesma é GRATUITA. Como é um documento federal, qualquer ação judicial será desferida na esfera federal (Polícia Federal).",
    "actions": [
        {
            "descricao": "Atendimento bovinocultura",
            "qtd": "1",
            "valor": "50.00",
            "action_id": "DAD7E4FB-7627-4BBE-8CF8-4E3269233499",
            "status": "INICIADA",
            "userDesigned_id": "AASDKHADADA-ADSDLAKDJLAKDS-ASDADASDSA"
        }
    ],
    "customers": [
        {
            "name": "Raimundo Lucindo de Souza",
            "cpf": "30878454691",
            "birth_date": "1948-11-23T03:00:00.000Z",
            "address": "Córrego Alto dos Mouras",
            "city": "Tarumirim"
        },
        {
            "name": "Geralda Rosa de Souza",
            "cpf": "02418725618",
            "birth_date": "1951-07-01T03:00:00.000Z",
            "address": null,
            "city": null
        }
    ]
}


     */
    return;
    this._treatmentService.create(treatment).subscribe(
      data=>{
        this._messageService.handleSuccess('Sucesso', 'Cadastro de atendimentos realizado.');
        this._usercache.gotoHome();
      },
      error=>{
        this._messageService.handleError('Erro', 'Erro ao realiza este cadastro');

      }
    );
  }
}
