import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsGenerateComponent } from './points-generate.component';

describe('PointsGenerateComponent', () => {
  let component: PointsGenerateComponent;
  let fixture: ComponentFixture<PointsGenerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointsGenerateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
