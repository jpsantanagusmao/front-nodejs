import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolingSelectComponent } from './schooling-select.component';

describe('SchoolingSelectComponent', () => {
  let component: SchoolingSelectComponent;
  let fixture: ComponentFixture<SchoolingSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolingSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolingSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
