import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDaeValueComponent } from './dialog-dae-value.component';

describe('DialogDaeValueComponent', () => {
  let component: DialogDaeValueComponent;
  let fixture: ComponentFixture<DialogDaeValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDaeValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDaeValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
