import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Class4CadastrarProjetoComponent } from './class4-cadastrar-projeto.component';

describe('Class4CadastrarProjetoComponent', () => {
  let component: Class4CadastrarProjetoComponent;
  let fixture: ComponentFixture<Class4CadastrarProjetoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Class4CadastrarProjetoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Class4CadastrarProjetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
