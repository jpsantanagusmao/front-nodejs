import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Class10CadastrarContractComponent } from './class10-cadastrar-contract.component';

describe('Class10CadastrarContractComponent', () => {
  let component: Class10CadastrarContractComponent;
  let fixture: ComponentFixture<Class10CadastrarContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Class10CadastrarContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Class10CadastrarContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
