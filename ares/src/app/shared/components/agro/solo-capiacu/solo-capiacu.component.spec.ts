import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoloCapiacuComponent } from './solo-capiacu.component';

describe('SoloCapiacuComponent', () => {
  let component: SoloCapiacuComponent;
  let fixture: ComponentFixture<SoloCapiacuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoloCapiacuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoloCapiacuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
