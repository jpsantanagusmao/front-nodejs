import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Class4InfracoesConsultaComponent } from './class4-infracoes-consulta.component';

describe('Class4InfracoesConsultaComponent', () => {
  let component: Class4InfracoesConsultaComponent;
  let fixture: ComponentFixture<Class4InfracoesConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Class4InfracoesConsultaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Class4InfracoesConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
