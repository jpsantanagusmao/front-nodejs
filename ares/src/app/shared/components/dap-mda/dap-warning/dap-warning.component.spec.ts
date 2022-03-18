import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DapWarningComponent } from './dap-warning.component';

describe('DapWarningComponent', () => {
  let component: DapWarningComponent;
  let fixture: ComponentFixture<DapWarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DapWarningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DapWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
