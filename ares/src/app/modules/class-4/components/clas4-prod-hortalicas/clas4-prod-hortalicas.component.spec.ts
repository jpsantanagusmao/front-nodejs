import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Clas4ProdHortalicasComponent } from './clas4-prod-hortalicas.component';

describe('Clas4ProdHortalicasComponent', () => {
  let component: Clas4ProdHortalicasComponent;
  let fixture: ComponentFixture<Clas4ProdHortalicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Clas4ProdHortalicasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Clas4ProdHortalicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
