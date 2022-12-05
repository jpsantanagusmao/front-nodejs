import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAgroindustriaCadComponent } from './dialog-agroindustria-cad.component';

describe('DialogAgroindustriaCadComponent', () => {
  let component: DialogAgroindustriaCadComponent;
  let fixture: ComponentFixture<DialogAgroindustriaCadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAgroindustriaCadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAgroindustriaCadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
