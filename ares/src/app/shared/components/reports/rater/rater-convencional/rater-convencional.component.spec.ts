import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaterConvencionalComponent } from './rater-convencional.component';

describe('RaterConvencionalComponent', () => {
  let component: RaterConvencionalComponent;
  let fixture: ComponentFixture<RaterConvencionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaterConvencionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaterConvencionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
