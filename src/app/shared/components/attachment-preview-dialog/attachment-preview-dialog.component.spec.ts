import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentPreviewDialogComponent } from './attachment-preview-dialog.component';
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatSnackBarModule} from "@angular/material/snack-bar";

describe('AttachmentPreviewDialogComponent', () => {
  let component: AttachmentPreviewDialogComponent;
  let fixture: ComponentFixture<AttachmentPreviewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttachmentPreviewDialogComponent ],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MatSnackBarModule,
      ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmentPreviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
