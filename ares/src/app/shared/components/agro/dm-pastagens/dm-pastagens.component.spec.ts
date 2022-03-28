import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmPastagensComponent } from './dm-pastagens.component';

describe('DmPastagensComponent', () => {
  let component: DmPastagensComponent;
  let fixture: ComponentFixture<DmPastagensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmPastagensComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmPastagensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
