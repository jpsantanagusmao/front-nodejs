import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DapConsultaComponent } from './dap-consulta.component';

describe('DapConsultaComponent', () => {
  let component: DapConsultaComponent;
  let fixture: ComponentFixture<DapConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DapConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DapConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
