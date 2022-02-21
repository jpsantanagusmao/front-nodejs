import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Class7MenuComponent } from './class7-menu.component';

describe('Class7MenuComponent', () => {
  let component: Class7MenuComponent;
  let fixture: ComponentFixture<Class7MenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Class7MenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Class7MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
