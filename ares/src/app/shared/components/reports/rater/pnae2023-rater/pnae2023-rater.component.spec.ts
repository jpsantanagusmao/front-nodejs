import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pnae2023RaterComponent } from './pnae2023-rater.component';

describe('Pnae2023RaterComponent', () => {
  let component: Pnae2023RaterComponent;
  let fixture: ComponentFixture<Pnae2023RaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Pnae2023RaterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Pnae2023RaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
