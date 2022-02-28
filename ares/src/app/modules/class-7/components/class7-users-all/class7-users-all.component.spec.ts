import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Class7UsersAllComponent } from './class7-users-all.component';

describe('Class7UsersAllComponent', () => {
  let component: Class7UsersAllComponent;
  let fixture: ComponentFixture<Class7UsersAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Class7UsersAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Class7UsersAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
