import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCredRuralAddItensCadComponent } from './dialog-cred-rural-add-itens-cad.component';

describe('DialogCredRuralAddItensCadComponent', () => {
  let component: DialogCredRuralAddItensCadComponent;
  let fixture: ComponentFixture<DialogCredRuralAddItensCadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCredRuralAddItensCadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCredRuralAddItensCadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
