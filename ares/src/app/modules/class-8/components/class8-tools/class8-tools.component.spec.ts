import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Class8ToolsComponent } from './class8-tools.component';

describe('Class8ToolsComponent', () => {
  let component: Class8ToolsComponent;
  let fixture: ComponentFixture<Class8ToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Class8ToolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Class8ToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
