import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentFocusComponent } from './attachment-focus.component';

describe('AttachmentFocusComponent', () => {
  let component: AttachmentFocusComponent;
  let fixture: ComponentFixture<AttachmentFocusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttachmentFocusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmentFocusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
