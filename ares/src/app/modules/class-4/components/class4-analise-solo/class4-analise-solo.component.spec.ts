import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Class4AnaliseSoloComponent } from './class4-analise-solo.component';

describe('Class4AnaliseSoloComponent', () => {
  let component: Class4AnaliseSoloComponent;
  let fixture: ComponentFixture<Class4AnaliseSoloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Class4AnaliseSoloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Class4AnaliseSoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
