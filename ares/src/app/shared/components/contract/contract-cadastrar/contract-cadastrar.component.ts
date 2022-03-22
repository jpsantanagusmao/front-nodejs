import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/core/admin.service';

@Component({
  selector: 'contract-cadastrar',
  templateUrl: './contract-cadastrar.component.html',
  styleUrls: ['./contract-cadastrar.component.css']
})
export class ContractCadastrarComponent implements OnInit {

  form: FormGroup;

  constructor(
    private _adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.form = new FormGroup({
      payment: new FormControl('15000.64', [Validators.required]),
      quota: new FormControl('12', [Validators.required]),
      ps: new FormControl('sem observações', [Validators.required]),
      partner_name: new FormControl('Prefeitura de itinga', [Validators.required]),
      partner_nickname: new FormControl('PM municipal itinga', [Validators.required]),
      partner_registry: new FormControl('00013546542054', [Validators.required]),
      partner_email: new FormControl('teo.itinga@gmail.com', [Validators.required]),
      partner_address: new FormControl('Rua Nsa. Sra. das gracas', [Validators.required]),
      partner_address_num: new FormControl('228', [Validators.required]),
      partner_address_complement: new FormControl('casa', [Validators.required]),
      partner_address_district: new FormControl('centro', [Validators.required]),
      partner_address_cep: new FormControl('35140000', [Validators.required]),
      partner_phone: new FormControl('33999065029', [Validators.required]),
      division_name: new FormControl('Sec. Agricultura', [Validators.required]),
      user_name: new FormControl('Joao Bosco Cordeiro', [Validators.required]),
      user_registry: new FormControl('bosquinho', [Validators.required]),
    });
  }
  registrar(){
    let contract = this.form.value;
    contract.mode_contract = 'FF19491D-B9A4-417A-8D70-CFFCB1D7D399';
    contract.mode_contract = 'FF19491D-B9A4-417A-8D70-CFFCB1D7D399';
    contract.mode_contract = 'FF19491D-B9A4-417A-8D70-CFFCB1D7D399';

    console.log(contract);
    this._adminService.createContract(contract).subscribe(
      success=>{
        console.log(success)
      },
      err=>{
        console.error(err)

      }
    );
  }
}
