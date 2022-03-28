import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Class4ToolsComponent } from './class4-tools.component';

describe('Class4ToolsComponent', () => {
  let component: Class4ToolsComponent;
  let fixture: ComponentFixture<Class4ToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Class4ToolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Class4ToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
