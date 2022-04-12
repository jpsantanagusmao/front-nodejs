import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RPnaeComponent } from './r-pnae.component';

describe('RPnaeComponent', () => {
  let component: RPnaeComponent;
  let fixture: ComponentFixture<RPnaeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RPnaeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RPnaeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
