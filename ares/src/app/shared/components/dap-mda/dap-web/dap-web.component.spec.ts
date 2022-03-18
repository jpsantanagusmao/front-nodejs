import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DapWebComponent } from './dap-web.component';

describe('DapWebComponent', () => {
  let component: DapWebComponent;
  let fixture: ComponentFixture<DapWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DapWebComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DapWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
