import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultaInfracoesComponent } from './consulta-infracoes.component';


describe('ConsultaInfracoes.TsComponent', () => {
  let component: ConsultaInfracoesComponent;
  let fixture: ComponentFixture<ConsultaInfracoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaInfracoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaInfracoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
