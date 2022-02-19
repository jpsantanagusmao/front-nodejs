import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Class4HomeComponent } from './class4-home.component';

describe('Class4HomeComponent', () => {
  let component: Class4HomeComponent;
  let fixture: ComponentFixture<Class4HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Class4HomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Class4HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
