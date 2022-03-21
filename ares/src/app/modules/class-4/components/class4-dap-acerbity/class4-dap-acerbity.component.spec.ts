import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Class4DapAcerbityComponent } from './class4-dap-acerbity.component';

describe('Class4DapAcerbityComponent', () => {
  let component: Class4DapAcerbityComponent;
  let fixture: ComponentFixture<Class4DapAcerbityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Class4DapAcerbityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Class4DapAcerbityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
