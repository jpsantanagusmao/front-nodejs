import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaAcompComponent } from './tela-acomp.component';

describe('TelaAcompComponent', () => {
  let component: TelaAcompComponent;
  let fixture: ComponentFixture<TelaAcompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaAcompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaAcompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
