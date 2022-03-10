import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Class4CadastrarTreatmentComponent } from './class4-cadastrar-treatment.component';

describe('Class4CadastrarTreatmentComponent', () => {
  let component: Class4CadastrarTreatmentComponent;
  let fixture: ComponentFixture<Class4CadastrarTreatmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Class4CadastrarTreatmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Class4CadastrarTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
