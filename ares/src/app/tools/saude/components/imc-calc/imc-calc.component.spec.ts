import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImcCalcComponent } from './imc-calc.component';

describe('ImcCalcComponent', () => {
  let component: ImcCalcComponent;
  let fixture: ComponentFixture<ImcCalcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImcCalcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImcCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
