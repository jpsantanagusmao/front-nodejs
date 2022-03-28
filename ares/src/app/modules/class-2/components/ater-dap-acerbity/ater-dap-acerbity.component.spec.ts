import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AterDapAcerbityComponent } from './ater-dap-acerbity.component';

describe('AterDapAcerbityComponent', () => {
  let component: AterDapAcerbityComponent;
  let fixture: ComponentFixture<AterDapAcerbityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AterDapAcerbityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AterDapAcerbityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
