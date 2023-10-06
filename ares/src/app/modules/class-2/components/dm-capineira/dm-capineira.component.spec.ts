import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmCapineiraComponent } from './dm-capineira.component';

describe('DmCapineiraComponent', () => {
  let component: DmCapineiraComponent;
  let fixture: ComponentFixture<DmCapineiraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmCapineiraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmCapineiraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
