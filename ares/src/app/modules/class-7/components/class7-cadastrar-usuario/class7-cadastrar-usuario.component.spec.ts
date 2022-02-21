import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Class7CadastrarUsuarioComponent } from './class7-cadastrar-usuario.component';

describe('Class7CadastrarUsuarioComponent', () => {
  let component: Class7CadastrarUsuarioComponent;
  let fixture: ComponentFixture<Class7CadastrarUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Class7CadastrarUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Class7CadastrarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
