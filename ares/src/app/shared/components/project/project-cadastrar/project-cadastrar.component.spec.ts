import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCadastrarComponent } from './project-cadastrar.component';

describe('ProjectCadastrarComponent', () => {
  let component: ProjectCadastrarComponent;
  let fixture: ComponentFixture<ProjectCadastrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectCadastrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCadastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
