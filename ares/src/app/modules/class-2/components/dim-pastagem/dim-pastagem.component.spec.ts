import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DimPastagemComponent } from './dim-pastagem.component';

describe('DimPastagemComponent', () => {
  let component: DimPastagemComponent;
  let fixture: ComponentFixture<DimPastagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DimPastagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DimPastagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
