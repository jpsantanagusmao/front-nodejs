import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Class4UsersAllComponent } from './class4-users-all.component';

describe('Class4UsersAllComponent', () => {
  let component: Class4UsersAllComponent;
  let fixture: ComponentFixture<Class4UsersAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Class4UsersAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Class4UsersAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
