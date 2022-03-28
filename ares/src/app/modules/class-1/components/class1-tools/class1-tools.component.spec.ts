import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Class1ToolsComponent } from './class1-tools.component';

describe('Class1ToolsComponent', () => {
  let component: Class1ToolsComponent;
  let fixture: ComponentFixture<Class1ToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Class1ToolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Class1ToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
