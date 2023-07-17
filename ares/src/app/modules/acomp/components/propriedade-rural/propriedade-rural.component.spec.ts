import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropriedadeRuralComponent } from './propriedade-rural.component';

describe('PropriedadeRuralComponent', () => {
  let component: PropriedadeRuralComponent;
  let fixture: ComponentFixture<PropriedadeRuralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropriedadeRuralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropriedadeRuralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
