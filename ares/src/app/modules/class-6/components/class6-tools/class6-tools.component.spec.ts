import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Class6ToolsComponent } from './class6-tools.component';

describe('Class6ToolsComponent', () => {
  let component: Class6ToolsComponent;
  let fixture: ComponentFixture<Class6ToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Class6ToolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Class6ToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
