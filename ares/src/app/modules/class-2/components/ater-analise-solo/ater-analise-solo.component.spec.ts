import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AterAnaliseSoloComponent } from './ater-analise-solo.component';

describe('AterAnaliseSoloComponent', () => {
  let component: AterAnaliseSoloComponent;
  let fixture: ComponentFixture<AterAnaliseSoloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AterAnaliseSoloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AterAnaliseSoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
