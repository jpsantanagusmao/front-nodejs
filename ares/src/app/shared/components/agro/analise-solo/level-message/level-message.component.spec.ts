import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelMessageComponent } from './level-message.component';

describe('LevelMessageComponent', () => {
  let component: LevelMessageComponent;
  let fixture: ComponentFixture<LevelMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
