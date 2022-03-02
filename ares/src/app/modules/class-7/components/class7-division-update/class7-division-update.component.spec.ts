import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Class7DivisionUpdateComponent } from './class7-division-update.component';

describe('Class7DivisionUpdateComponent', () => {
  let component: Class7DivisionUpdateComponent;
  let fixture: ComponentFixture<Class7DivisionUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Class7DivisionUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Class7DivisionUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
