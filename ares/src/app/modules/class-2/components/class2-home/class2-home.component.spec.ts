import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Class2HomeComponent } from './class2-home.component';

describe('Class2HomeComponent', () => {
  let component: Class2HomeComponent;
  let fixture: ComponentFixture<Class2HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Class2HomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Class2HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
