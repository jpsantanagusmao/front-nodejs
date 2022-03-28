import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Class9ToolsComponent } from './class9-tools.component';

describe('Class9ToolsComponent', () => {
  let component: Class9ToolsComponent;
  let fixture: ComponentFixture<Class9ToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Class9ToolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Class9ToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
