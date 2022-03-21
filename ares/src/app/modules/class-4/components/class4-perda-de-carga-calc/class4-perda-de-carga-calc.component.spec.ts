import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Class4PerdaDeCargaCalcComponent } from './class4-perda-de-carga-calc.component';

describe('Class4PerdaDeCargaCalcComponent', () => {
  let component: Class4PerdaDeCargaCalcComponent;
  let fixture: ComponentFixture<Class4PerdaDeCargaCalcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Class4PerdaDeCargaCalcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Class4PerdaDeCargaCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
