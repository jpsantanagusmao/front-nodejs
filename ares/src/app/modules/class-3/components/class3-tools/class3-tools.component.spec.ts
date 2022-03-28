import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Class3ToolsComponent } from './class3-tools.component';

describe('Class3ToolsComponent', () => {
  let component: Class3ToolsComponent;
  let fixture: ComponentFixture<Class3ToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Class3ToolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Class3ToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
