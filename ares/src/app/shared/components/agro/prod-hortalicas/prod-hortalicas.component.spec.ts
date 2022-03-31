import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdHortalicasComponent } from './prod-hortalicas.component';

describe('ProdHortalicasComponent', () => {
  let component: ProdHortalicasComponent;
  let fixture: ComponentFixture<ProdHortalicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdHortalicasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdHortalicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
