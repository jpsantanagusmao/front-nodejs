import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnaliseSoloComponent } from './analise-solo.component';

describe('AnaliseSoloComponent', () => {
  let component: AnaliseSoloComponent;
  let fixture: ComponentFixture<AnaliseSoloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnaliseSoloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnaliseSoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
