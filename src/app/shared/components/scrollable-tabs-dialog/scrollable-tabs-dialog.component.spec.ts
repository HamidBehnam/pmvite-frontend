import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollableTabsDialogComponent } from './scrollable-tabs-dialog.component';

describe('ScrollableTabsDialogComponent', () => {
  let component: ScrollableTabsDialogComponent;
  let fixture: ComponentFixture<ScrollableTabsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrollableTabsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollableTabsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
