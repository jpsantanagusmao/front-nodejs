import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Class10HomeComponent } from './class10-home.component';

describe('Class10HomeComponent', () => {
  let component: Class10HomeComponent;
  let fixture: ComponentFixture<Class10HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Class10HomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Class10HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
