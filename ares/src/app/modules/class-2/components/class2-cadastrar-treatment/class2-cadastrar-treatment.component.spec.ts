import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Class2CadastrarTreatmentComponent } from './class2-cadastrar-treatment.component';

describe('Class2CadastrarTreatmentComponent', () => {
  let component: Class2CadastrarTreatmentComponent;
  let fixture: ComponentFixture<Class2CadastrarTreatmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Class2CadastrarTreatmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Class2CadastrarTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
