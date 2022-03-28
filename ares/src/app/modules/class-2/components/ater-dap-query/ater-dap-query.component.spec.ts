import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AterDapQueryComponent } from './ater-dap-query.component';

describe('AterDapQueryComponent', () => {
  let component: AterDapQueryComponent;
  let fixture: ComponentFixture<AterDapQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AterDapQueryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AterDapQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
