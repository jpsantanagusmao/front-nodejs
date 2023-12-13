import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProjectsAcompComponent } from './dashboard-projects-acomp.component';

describe('DashboardProjectsAcompComponent', () => {
  let component: DashboardProjectsAcompComponent;
  let fixture: ComponentFixture<DashboardProjectsAcompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardProjectsAcompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardProjectsAcompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
