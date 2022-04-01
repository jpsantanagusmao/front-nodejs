import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentsByDateComponent } from './treatments-by-date.component';

describe('TreatmentsByDateComponent', () => {
  let component: TreatmentsByDateComponent;
  let fixture: ComponentFixture<TreatmentsByDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreatmentsByDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentsByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
