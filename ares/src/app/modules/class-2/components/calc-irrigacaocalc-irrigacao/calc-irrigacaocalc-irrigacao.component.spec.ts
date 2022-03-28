import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcIrrigacaocalcIrrigacaoComponent } from './calc-irrigacaocalc-irrigacao.component';

describe('CalcIrrigacaocalcIrrigacaoComponent', () => {
  let component: CalcIrrigacaocalcIrrigacaoComponent;
  let fixture: ComponentFixture<CalcIrrigacaocalcIrrigacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalcIrrigacaocalcIrrigacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcIrrigacaocalcIrrigacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
