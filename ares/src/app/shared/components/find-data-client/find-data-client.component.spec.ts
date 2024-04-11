import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindDataClientComponent } from './find-data-client.component';

describe('FindDataClientComponent', () => {
  let component: FindDataClientComponent;
  let fixture: ComponentFixture<FindDataClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindDataClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindDataClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
