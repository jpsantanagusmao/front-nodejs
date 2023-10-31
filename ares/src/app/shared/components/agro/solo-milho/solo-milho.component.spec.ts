import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoloMilhoComponent } from './solo-milho.component';

describe('SoloMilhoComponent', () => {
  let component: SoloMilhoComponent;
  let fixture: ComponentFixture<SoloMilhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoloMilhoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoloMilhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
