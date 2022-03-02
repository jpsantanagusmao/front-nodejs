import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionAllComponent } from './division-all.component';

describe('DivisionAllComponent', () => {
  let component: DivisionAllComponent;
  let fixture: ComponentFixture<DivisionAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivisionAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisionAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
