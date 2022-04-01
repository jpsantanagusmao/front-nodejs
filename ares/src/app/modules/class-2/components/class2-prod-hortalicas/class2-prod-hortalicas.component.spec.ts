import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Class2ProdHortalicasComponent } from './class2-prod-hortalicas.component';

describe('Class2ProdHortalicasComponent', () => {
  let component: Class2ProdHortalicasComponent;
  let fixture: ComponentFixture<Class2ProdHortalicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Class2ProdHortalicasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Class2ProdHortalicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
