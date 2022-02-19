import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerdaDeCargaCalcComponent } from './perda-de-carga-calc.component';

describe('PerdaDeCargaCalcComponent', () => {
  let component: PerdaDeCargaCalcComponent;
  let fixture: ComponentFixture<PerdaDeCargaCalcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerdaDeCargaCalcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerdaDeCargaCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
