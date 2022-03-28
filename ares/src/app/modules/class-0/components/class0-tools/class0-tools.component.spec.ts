import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Class0ToolsComponent } from './class0-tools.component';

describe('Class0ToolsComponent', () => {
  let component: Class0ToolsComponent;
  let fixture: ComponentFixture<Class0ToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Class0ToolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Class0ToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
