import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogArtValueComponent } from './dialog-art-value.component';

describe('DialogArtValueComponent', () => {
  let component: DialogArtValueComponent;
  let fixture: ComponentFixture<DialogArtValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogArtValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogArtValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
