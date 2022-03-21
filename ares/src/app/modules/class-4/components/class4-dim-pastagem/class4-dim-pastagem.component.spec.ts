import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Class4DimPastagemComponent } from './class4-dim-pastagem.component';

describe('Class4DimPastagemComponent', () => {
  let component: Class4DimPastagemComponent;
  let fixture: ComponentFixture<Class4DimPastagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Class4DimPastagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Class4DimPastagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
