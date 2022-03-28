import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Class2ToolsComponent } from './class2-tools.component';

describe('Class2ToolsComponent', () => {
  let component: Class2ToolsComponent;
  let fixture: ComponentFixture<Class2ToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Class2ToolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Class2ToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
