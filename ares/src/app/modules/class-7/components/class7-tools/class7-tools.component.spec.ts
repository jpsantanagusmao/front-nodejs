import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Class7ToolsComponent } from './class7-tools.component';

describe('Class7ToolsComponent', () => {
  let component: Class7ToolsComponent;
  let fixture: ComponentFixture<Class7ToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Class7ToolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Class7ToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
