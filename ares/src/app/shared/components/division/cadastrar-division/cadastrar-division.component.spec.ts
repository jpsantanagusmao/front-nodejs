import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarDivisionComponent } from './cadastrar-division.component';

describe('CadastrarDivisionComponent', () => {
  let component: CadastrarDivisionComponent;
  let fixture: ComponentFixture<CadastrarDivisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarDivisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
