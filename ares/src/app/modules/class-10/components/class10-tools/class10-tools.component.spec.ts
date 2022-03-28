import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Class10ToolsComponent } from './class10-tools.component';

describe('Class10ToolsComponent', () => {
  let component: Class10ToolsComponent;
  let fixture: ComponentFixture<Class10ToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Class10ToolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Class10ToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
