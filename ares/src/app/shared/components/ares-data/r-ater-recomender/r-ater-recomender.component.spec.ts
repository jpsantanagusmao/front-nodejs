import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RAterRecomenderComponent } from './r-ater-recomender.component';

describe('RAterRecomenderComponent', () => {
  let component: RAterRecomenderComponent;
  let fixture: ComponentFixture<RAterRecomenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RAterRecomenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RAterRecomenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
