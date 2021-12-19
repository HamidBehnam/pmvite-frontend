import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileReference } from '../../types/file-reference.model';
import { FormInteractionResult } from '../../types/form-interacation-result.model';
import { AttachmentForm } from '../../types/attachment-form.model';
import { FileDownloadMeta } from '../../types/file-download-meta';

@Component({
  selector: 'app-attachment-focus',
  templateUrl: './attachment-focus.component.html',
  styleUrls: ['./attachment-focus.component.scss']
})
export class AttachmentFocusComponent implements OnInit {

  @Input() attachment?: FileReference;
  @Input() canEdit?: boolean;
  @Input() attachmentDirectLink: string;
  @Output() projectAttachmentsListRequested: EventEmitter<void>;
  @Output() saveRequested: EventEmitter<FormInteractionResult<AttachmentForm>>;
  @Output() downloadRequested: EventEmitter<FileDownloadMeta>;

  constructor() {
    this.projectAttachmentsListRequested = new EventEmitter<void>();
    this.saveRequested = new EventEmitter<FormInteractionResult<AttachmentForm>>();
    this.downloadRequested = new EventEmitter<FileDownloadMeta>();
    this.attachmentDirectLink = '';
  }

  ngOnInit(): void {
  }

  showProjectAttachments(): void {
    this.projectAttachmentsListRequested.emit();
  }

  saveAttachment(formInteractionResult: FormInteractionResult<AttachmentForm>): void {
    this.saveRequested.emit(formInteractionResult);
  }

  downloadAttachment(fileDownloadMeta: FileDownloadMeta): void {
    this.downloadRequested.emit(fileDownloadMeta);
  }
}
