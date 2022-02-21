import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Class4CadastrarUsuarioComponent } from './class4-cadastrar-usuario.component';

describe('Class4CadastrarUsuarioComponent', () => {
  let component: Class4CadastrarUsuarioComponent;
  let fixture: ComponentFixture<Class4CadastrarUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Class4CadastrarUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Class4CadastrarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
