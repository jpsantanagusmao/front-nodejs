import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUsersAcompComponent } from './dashboard-users-acomp.component';

describe('DashboardUsersAcompComponent', () => {
  let component: DashboardUsersAcompComponent;
  let fixture: ComponentFixture<DashboardUsersAcompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardUsersAcompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardUsersAcompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
