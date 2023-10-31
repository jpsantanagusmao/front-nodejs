import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Class4ProjetoRegionalComponent } from './class4-projeto-regional.component';

describe('Class4ProjetoRegionalComponent', () => {
  let component: Class4ProjetoRegionalComponent;
  let fixture: ComponentFixture<Class4ProjetoRegionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Class4ProjetoRegionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Class4ProjetoRegionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
