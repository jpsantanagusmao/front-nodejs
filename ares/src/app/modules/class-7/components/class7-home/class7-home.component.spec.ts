import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Class7HomeComponent } from './class7-home.component';

describe('Class7HomeComponent', () => {
  let component: Class7HomeComponent;
  let fixture: ComponentFixture<Class7HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Class7HomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Class7HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
