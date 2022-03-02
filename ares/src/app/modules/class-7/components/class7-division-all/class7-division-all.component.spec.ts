import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Class7DivisionAllComponent } from './class7-division-all.component';

describe('Class7DivisionAllComponent', () => {
  let component: Class7DivisionAllComponent;
  let fixture: ComponentFixture<Class7DivisionAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Class7DivisionAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Class7DivisionAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
