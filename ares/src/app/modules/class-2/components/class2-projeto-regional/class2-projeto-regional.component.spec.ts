import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Class2ProjetoRegionalComponent } from './class2-projeto-regional.component';

describe('Class2ProjetoRegionalComponent', () => {
  let component: Class2ProjetoRegionalComponent;
  let fixture: ComponentFixture<Class2ProjetoRegionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Class2ProjetoRegionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Class2ProjetoRegionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
