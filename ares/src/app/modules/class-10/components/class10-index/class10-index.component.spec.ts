import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Class10IndexComponent } from './class10-index.component';

describe('Class10IndexComponent', () => {
  let component: Class10IndexComponent;
  let fixture: ComponentFixture<Class10IndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Class10IndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Class10IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
