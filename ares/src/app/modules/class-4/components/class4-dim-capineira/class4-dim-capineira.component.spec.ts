import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Class4DimCapineiraComponent } from './class4-dim-capineira.component';

describe('Class4DimCapineiraComponent', () => {
  let component: Class4DimCapineiraComponent;
  let fixture: ComponentFixture<Class4DimCapineiraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Class4DimCapineiraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Class4DimCapineiraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
