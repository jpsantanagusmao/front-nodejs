import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContatoFuncionarioComponent } from './contato-funcionario.component';

describe('ContatoFuncionarioComponent', () => {
  let component: ContatoFuncionarioComponent;
  let fixture: ComponentFixture<ContatoFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContatoFuncionarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContatoFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
