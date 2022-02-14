import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthBodyComponent } from './auth-body.component';

describe('AuthBodyComponent', () => {
  let component: AuthBodyComponent;
  let fixture: ComponentFixture<AuthBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
