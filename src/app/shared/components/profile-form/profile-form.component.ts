import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Profile } from '../../types/profile.model';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {

  @Input() profile?: Profile;
  @Output() cancel: EventEmitter<void>;
  @Output() save: EventEmitter<Partial<Profile>>;
  @ViewChild('profileFormRef') profileFormRef?: FormGroupDirective;
  profileFormGroup: FormGroup;
  editingFieldName: string;

  constructor(public uiService: UiService) {
    this.cancel = new EventEmitter<void>();
    this.save = new EventEmitter<Partial<Profile>>();
    this.profileFormGroup = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      description: new FormControl('')
    });
    this.editingFieldName = '';
  }

  ngOnInit(): void {
    if (this.profile) {
      this.profileFormGroup.setValue({
        firstName: this.profile.firstName,
        lastName: this.profile.lastName,
        title: this.profile.title,
        description: this.profile.description
      });
    }
  }

  triggerFormSubmission(): void {
    if (this.profileFormRef) {
      this.profileFormRef.onSubmit(new Event('submit'));
    }
  }

  setEditingField(fieldName: string): void {
    this.editingFieldName = fieldName;
  }

  preview(fieldName: string): void {
    this.editingFieldName = '';
  }

  cancelEmitter(): void {
    this.cancel.emit();
  }

  saveEmitter(): void {
    if (this.profileFormGroup.valid) {
      this.save.emit(this.profileFormGroup.value);
    }
  }
}
