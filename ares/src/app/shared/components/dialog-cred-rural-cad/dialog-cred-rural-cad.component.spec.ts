import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProdLeiteCadComponent } from './dialog-prod-leite-cad.component';

describe('DialogProdLeiteCadComponent', () => {
  let component: DialogProdLeiteCadComponent;
  let fixture: ComponentFixture<DialogProdLeiteCadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogProdLeiteCadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogProdLeiteCadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
