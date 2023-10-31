import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmEsterqueiraComponent } from './dm-esterqueira.component';

describe('DmEsterqueiraComponent', () => {
  let component: DmEsterqueiraComponent;
  let fixture: ComponentFixture<DmEsterqueiraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmEsterqueiraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmEsterqueiraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
