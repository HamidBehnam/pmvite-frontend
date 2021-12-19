import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { Profile } from '../../types/profile.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UiService } from '../../services/ui.service';
import { labelShowHideTrigger } from '../../animations/label-show-hide-trigger';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss'],
  animations: [
    labelShowHideTrigger
  ]
})
export class ProfileDetailComponent implements OnInit, OnChanges {

  @Input() profile?: Profile;
  @Input() canEdit?: boolean;
  @Output() saveRequested: EventEmitter<Partial<Profile>>;
  profileFormGroup: FormGroup;
  editingFieldName: string;
  fieldNames = {
    firstName: 'firstName',
    lastName: 'lastName',
    title: 'title',
    description: 'description'
  };

  constructor(public uiService: UiService) {
    this.saveRequested = new EventEmitter<Partial<Profile>>();
    this.profileFormGroup = new FormGroup({
      [this.fieldNames.firstName]: new FormControl('', Validators.required),
      [this.fieldNames.lastName]: new FormControl('', Validators.required),
      [this.fieldNames.title]: new FormControl('', Validators.required),
      [this.fieldNames.description]: new FormControl('')
    });
    this.editingFieldName = '';
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const changedProfile: SimpleChange = changes.profile;

    if (changedProfile) {
      /*
       the reason for setting the form values in ngOnChanges and not in ngOnInit is because the profile
       could be changed "while" the user is seeing the component for instance when they open a profile
       and switch to their own profile from the menu while they're in the profile page. In this case
       the ngOnInit won't run again and as the result the form shows the wrong data associated with the previous profile.
      */
      this.setProfileFormValues(changedProfile.currentValue);
    }
  }

  setProfileFormValues(profile: Profile): void {
    this.profileFormGroup.setValue({
      [this.fieldNames.firstName]: profile.firstName,
      [this.fieldNames.lastName]: profile.lastName,
      [this.fieldNames.title]: profile.title,
      [this.fieldNames.description]: profile.description,
    });
  }

  setEditingField(fieldName: string): void {
    if (this.canEdit) {
      this.editingFieldName = fieldName;
    }
  }

  saveField(fieldName: string): void {
    const formControl = this.profileFormGroup.get(fieldName);
    formControl?.updateValueAndValidity();

    if (formControl?.valid) {

      this.saveRequested.emit({
        [fieldName]: formControl?.value
      });

      this.editingFieldName = '';
    }
  }

  cancelEdit(fieldName: string): void {
    if (this.profile) {
      this.profileFormGroup.get(fieldName)?.setValue(this.profile[fieldName as keyof Profile]);
      this.editingFieldName = '';
    }
  }
}

