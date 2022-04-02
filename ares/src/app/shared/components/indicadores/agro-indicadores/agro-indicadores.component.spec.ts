import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgroIndicadoresComponent } from './agro-indicadores.component';

describe('AgroIndicadoresComponent', () => {
  let component: AgroIndicadoresComponent;
  let fixture: ComponentFixture<AgroIndicadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgroIndicadoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgroIndicadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
