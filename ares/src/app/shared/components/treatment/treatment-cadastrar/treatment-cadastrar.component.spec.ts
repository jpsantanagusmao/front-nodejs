import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentCadastrarComponent } from './treatment-cadastrar.component';

describe('TreatmentCadastrarComponent', () => {
  let component: TreatmentCadastrarComponent;
  let fixture: ComponentFixture<TreatmentCadastrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreatmentCadastrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentCadastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
