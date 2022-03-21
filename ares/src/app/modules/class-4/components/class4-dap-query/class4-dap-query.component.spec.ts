import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Class4DapQueryComponent } from './class4-dap-query.component';

describe('Class4DapQueryComponent', () => {
  let component: Class4DapQueryComponent;
  let fixture: ComponentFixture<Class4DapQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Class4DapQueryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Class4DapQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
