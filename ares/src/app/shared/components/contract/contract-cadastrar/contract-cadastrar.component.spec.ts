import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractCadastrarComponent } from './contract-cadastrar.component';

describe('ContractCadastrarComponent', () => {
  let component: ContractCadastrarComponent;
  let fixture: ComponentFixture<ContractCadastrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractCadastrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractCadastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
