import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SilagemDimComponent } from './silagem-dim.component';

describe('SilagemDimComponent', () => {
  let component: SilagemDimComponent;
  let fixture: ComponentFixture<SilagemDimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SilagemDimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SilagemDimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
