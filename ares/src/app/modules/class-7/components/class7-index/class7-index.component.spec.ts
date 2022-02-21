import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Class7IndexComponent } from './class7-index.component';

describe('Class7IndexComponent', () => {
  let component: Class7IndexComponent;
  let fixture: ComponentFixture<Class7IndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Class7IndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Class7IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
