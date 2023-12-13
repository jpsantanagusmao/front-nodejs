import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsListAcompComponent } from './projects-list-acomp.component';

describe('ProjectsListAcompComponent', () => {
  let component: ProjectsListAcompComponent;
  let fixture: ComponentFixture<ProjectsListAcompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsListAcompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsListAcompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
