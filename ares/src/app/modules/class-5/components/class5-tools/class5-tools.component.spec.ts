import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Class5ToolsComponent } from './class5-tools.component';

describe('Class5ToolsComponent', () => {
  let component: Class5ToolsComponent;
  let fixture: ComponentFixture<Class5ToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Class5ToolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Class5ToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
