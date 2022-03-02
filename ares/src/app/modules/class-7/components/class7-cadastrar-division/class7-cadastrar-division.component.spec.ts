import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Class7CadastrarDivisionComponent } from './class7-cadastrar-division.component';

describe('Class7CadastrarDivisionComponent', () => {
  let component: Class7CadastrarDivisionComponent;
  let fixture: ComponentFixture<Class7CadastrarDivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Class7CadastrarDivisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Class7CadastrarDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
