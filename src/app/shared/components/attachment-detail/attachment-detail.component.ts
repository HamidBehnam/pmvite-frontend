import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileReference } from '../../types/file-reference.model';
import { FormInteractionResult } from '../../types/form-interacation-result.model';
import { AttachmentForm } from '../../types/attachment-form.model';
import { environment } from '../../../../environments/environment';
import * as moment from 'moment';
import { UiService } from '../../services/ui.service';
import { labelShowHideTrigger } from '../../animations/label-show-hide-trigger';

@Component({
  selector: 'app-attachment-detail',
  templateUrl: './attachment-detail.component.html',
  styleUrls: ['./attachment-detail.component.scss'],
  animations: [
    labelShowHideTrigger
  ]
})
export class AttachmentDetailComponent implements OnInit {

  @Input() attachment?: FileReference;
  @Input() canEdit?: boolean;
  @Output() saveRequested: EventEmitter<FormInteractionResult<AttachmentForm>>;
  attachmentFormGroup: FormGroup;
  editingFieldName = '';
  fieldNames = {
    filename: 'filename',
    description: 'description'
  };

  constructor(public uiService: UiService) {
    this.attachmentFormGroup = new FormGroup({
       [this.fieldNames.filename]: new FormControl('', Validators.required),
       [this.fieldNames.description]: new FormControl('')
    });

    this.saveRequested = new EventEmitter<FormInteractionResult<AttachmentForm>>();
  }

  ngOnInit(): void {
    if (this.attachment) {
      this.attachmentFormGroup.setValue({
        [this.fieldNames.filename]: this.getFilenameWithoutExtension(),
        [this.fieldNames.description]: this.attachment.metadata.description || ''
      });
    }
  }

  getFilenameWithoutExtension(): string {
    return this.attachment?.filename.slice(0, this.attachment?.filename.lastIndexOf('.')) || '';
  }

  setEditingField(fieldName: string): void {
    if (this.canEdit) {
      this.editingFieldName = fieldName;
    }
  }

  saveField(fieldName: string): void {
    if (this.attachment) {

      const formControl = this.attachmentFormGroup.get(fieldName);
      formControl?.updateValueAndValidity();

      if (formControl?.valid) {
        const formInteractionResult: FormInteractionResult<AttachmentForm> = {
          id: this.attachment._id,
          payload: {
            [fieldName]: fieldName === this.fieldNames.description ? formControl?.value || '' : formControl.value
          }
        };

        this.saveRequested.emit(formInteractionResult);

        this.editingFieldName = '';
      }
    }
  }

  cancelEdit(fieldName: string): void {
    if (this.attachment) {
      let fieldInitialValue;

      switch (fieldName) {
        case this.fieldNames.description:
          fieldInitialValue = this.attachment.metadata[fieldName];
          break;
        case this.fieldNames.filename:
          fieldInitialValue = this.getFilenameWithoutExtension();
          break;
      }

      this.attachmentFormGroup.get(fieldName)?.setValue(fieldInitialValue);
      this.editingFieldName = '';
    }
  }

  getAttachmentUrl(): string {
    return `${environment.apiUrl}/projects/${this.attachment?.metadata.project}/attachments/${this.attachment?._id}`;
  }

  getAttachmentUploadDateTime(uploadRawDateTime: string): string {
    return moment(uploadRawDateTime).format('MMMM Do YYYY, h:mm:ss A');
  }
}
