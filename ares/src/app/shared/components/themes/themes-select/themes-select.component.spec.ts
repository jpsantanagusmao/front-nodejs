import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemesSelectComponent } from './themes-select.component';

describe('ThemesSelectComponent', () => {
  let component: ThemesSelectComponent;
  let fixture: ComponentFixture<ThemesSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemesSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemesSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
