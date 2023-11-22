import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectItensFinanciaveisComponent } from './select-itens-financiaveis.component';

describe('SelectItensFinanciaveisComponent', () => {
  let component: SelectItensFinanciaveisComponent;
  let fixture: ComponentFixture<SelectItensFinanciaveisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectItensFinanciaveisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectItensFinanciaveisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
