import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanielSimulacaoComponent } from './paniel-simulacao.component';

describe('PanielSimulacaoComponent', () => {
  let component: PanielSimulacaoComponent;
  let fixture: ComponentFixture<PanielSimulacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanielSimulacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanielSimulacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
