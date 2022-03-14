import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCadastrarComponent } from './customer-cadastrar.component';

describe('CustomerCadastrarComponent', () => {
  let component: CustomerCadastrarComponent;
  let fixture: ComponentFixture<CustomerCadastrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerCadastrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCadastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
