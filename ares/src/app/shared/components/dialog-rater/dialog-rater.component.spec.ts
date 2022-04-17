import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRaterComponent } from './dialog-rater.component';

describe('DialogRaterComponent', () => {
  let component: DialogRaterComponent;
  let fixture: ComponentFixture<DialogRaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRaterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
