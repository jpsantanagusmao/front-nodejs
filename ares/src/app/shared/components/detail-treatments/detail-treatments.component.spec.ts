import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTreatmentsComponent } from './detail-treatments.component';

describe('DetailTreatmentsComponent', () => {
  let component: DetailTreatmentsComponent;
  let fixture: ComponentFixture<DetailTreatmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailTreatmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTreatmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
