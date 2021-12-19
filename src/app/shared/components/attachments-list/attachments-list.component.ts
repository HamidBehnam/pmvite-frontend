import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FileReference } from '../../types/file-reference.model';
import { FormInteractionResult } from '../../types/form-interacation-result.model';
import { AttachmentForm } from '../../types/attachment-form.model';
import { FileSpecification } from '../../types/file-specification.model';
import { getProjectAttachmentSpecification } from '../../types/project.model';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'app-attachments-list',
  templateUrl: './attachments-list.component.html',
  styleUrls: ['./attachments-list.component.scss']
})
export class AttachmentsListComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() attachments?: FileReference[];
  @Input() canEdit?: boolean;
  @Input() uploadProgress$: BehaviorSubject<number>;
  @Input() closeAttachmentCreationPanel: Subject<void>;
  @Input() attachmentCreationPanelOpeningSignal: Subject<void>;
  @Output() attachmentCreationPanelOpened: EventEmitter<void>;
  @Output() attachmentCreationPanelClosed: EventEmitter<void>;
  @Output() saveRequested: EventEmitter<FormInteractionResult<AttachmentForm>>;
  @Output() focusViewRequested: EventEmitter<FileReference>;
  @Output() deleteRequested: EventEmitter<string>;
  @Output() attachmentSelectedForUpload: EventEmitter<File>;
  @ViewChild('attachmentCreationPanel') attachmentCreationPanel?: MatExpansionPanel;
  projectAttachmentSpecification: FileSpecification;
  attachmentCreationPanelOpeningSubscription?: Subscription;
  closeAttachmentCreationPanelSubscription?: Subscription;
  openedAttachmentPanelId?: string;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.saveRequested = new EventEmitter<FormInteractionResult<AttachmentForm>>();
    this.focusViewRequested = new EventEmitter<FileReference>();
    this.deleteRequested = new EventEmitter<string>();
    this.projectAttachmentSpecification = getProjectAttachmentSpecification();
    this.uploadProgress$ = new BehaviorSubject<number>(0);
    this.attachmentSelectedForUpload = new EventEmitter<File>();
    this.closeAttachmentCreationPanel = new Subject<void>();
    this.attachmentCreationPanelOpened = new EventEmitter<void>();
    this.attachmentCreationPanelClosed = new EventEmitter<void>();
    this.attachmentCreationPanelOpeningSignal = new Subject();
  }

  ngOnInit(): void {
    this.closeAttachmentCreationPanelSubscription = this.closeAttachmentCreationPanel.subscribe(_ =>
      this.attachmentCreationPanel?.close());
  }

  ngAfterViewInit(): void {
    this.attachmentCreationPanelOpeningSubscription = this.attachmentCreationPanelOpeningSignal.subscribe(_ => {
      this.attachmentCreationPanel?.open();
      this.changeDetectorRef.detectChanges();
    });
  }

  saveAttachment(formInteractionResult: FormInteractionResult<AttachmentForm>): void {
    this.saveRequested.emit(formInteractionResult);
  }

  openInFocusView(attachment: FileReference): void {
    this.focusViewRequested.emit(attachment);
  }

  deleteAttachment(attachment: FileReference): void {
    this.deleteRequested.emit(attachment._id);
  }

  onAttachmentCreationPanelOpened(): void {
    this.attachmentCreationPanelOpened.emit();
  }

  onAttachmentCreationPanelClosed(): void {
    this.attachmentCreationPanelClosed.emit();
  }

  onAttachmentDetailPanelOpened(attachment: FileReference): void {
    this.openedAttachmentPanelId = attachment._id;
  }

  onAttachmentDetailPanelClosed(attachment: FileReference): void {
    if (this.openedAttachmentPanelId === attachment._id) {
      this.openedAttachmentPanelId = undefined;
    }
  }

  onFileSelected(file: File): void {
    this.attachmentSelectedForUpload.emit(file);
  }

  ngOnDestroy(): void {
    this.closeAttachmentCreationPanelSubscription?.unsubscribe();
    this.attachmentCreationPanelOpeningSubscription?.unsubscribe();
  }
}
