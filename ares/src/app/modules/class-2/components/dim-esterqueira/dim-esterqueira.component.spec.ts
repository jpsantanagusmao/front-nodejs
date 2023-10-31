import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DimEsterqueiraComponent } from './dim-esterqueira.component';

describe('DimEsterqueiraComponent', () => {
  let component: DimEsterqueiraComponent;
  let fixture: ComponentFixture<DimEsterqueiraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DimEsterqueiraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DimEsterqueiraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
