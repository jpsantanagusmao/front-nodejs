import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Class2InfracoesConsultaComponent } from './class2-infracoes-consulta.component';

describe('Class2InfracoesConsultaComponent', () => {
  let component: Class2InfracoesConsultaComponent;
  let fixture: ComponentFixture<Class2InfracoesConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Class2InfracoesConsultaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Class2InfracoesConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
