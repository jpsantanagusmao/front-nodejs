import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AterIaComponent } from './ater-ia.component';

describe('AterIaComponent', () => {
  let component: AterIaComponent;
  let fixture: ComponentFixture<AterIaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AterIaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AterIaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
