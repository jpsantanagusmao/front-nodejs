import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmSupForragComponent } from './dm-sup-forrag.component';

describe('DmSupForragComponent', () => {
  let component: DmSupForragComponent;
  let fixture: ComponentFixture<DmSupForragComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmSupForragComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmSupForragComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
