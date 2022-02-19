import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastagemDimComponent } from './pastagem-dim.component';

describe('PastagemDimComponent', () => {
  let component: PastagemDimComponent;
  let fixture: ComponentFixture<PastagemDimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastagemDimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastagemDimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
