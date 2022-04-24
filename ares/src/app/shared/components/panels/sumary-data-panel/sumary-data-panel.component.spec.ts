import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumaryDataPanelComponent } from './sumary-data-panel.component';

describe('SumaryDataPanelComponent', () => {
  let component: SumaryDataPanelComponent;
  let fixture: ComponentFixture<SumaryDataPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SumaryDataPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SumaryDataPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
