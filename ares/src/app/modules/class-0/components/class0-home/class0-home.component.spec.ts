import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Class0HomeComponent } from './class0-home.component';

describe('Class0HomeComponent', () => {
  let component: Class0HomeComponent;
  let fixture: ComponentFixture<Class0HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Class0HomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Class0HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
