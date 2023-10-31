import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmDietaComponent } from './dm-dieta.component';

describe('DmDietaComponent', () => {
  let component: DmDietaComponent;
  let fixture: ComponentFixture<DmDietaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmDietaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmDietaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
