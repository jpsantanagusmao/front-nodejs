import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivatedComponent } from './privated.component';

describe('PrivatedComponent', () => {
  let component: PrivatedComponent;
  let fixture: ComponentFixture<PrivatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
