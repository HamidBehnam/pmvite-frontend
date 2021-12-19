import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentsListComponent } from './attachments-list.component';

describe('AttachmentsListComponent', () => {
  let component: AttachmentsListComponent;
  let fixture: ComponentFixture<AttachmentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttachmentsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
