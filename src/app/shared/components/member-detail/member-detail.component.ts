import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Member } from '../../types/member.model';
import { getProjectMemberRoleItem, getProjectMemberRoleItems, ProjectMemberRoleItem } from '../../types/project-member-role-item.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectMemberRole } from '../../types/project-member-role.enum';
import { labelShowHideTrigger } from '../../animations/label-show-hide-trigger';
import { MemberFormContent } from '../../types/member-form-content';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss'],
  animations: [
    labelShowHideTrigger
  ]
})
export class MemberDetailComponent implements OnInit {

  @Input() member?: Member;
  @Input() memberIsEditable?: boolean;
  @Input() loggedInUserId?: string;
  @Output() saveRequested: EventEmitter<Partial<Member>>;
  memberFormContent = MemberFormContent;
  memberFormGroup: FormGroup;
  memberRoleItems!: ProjectMemberRoleItem[];
  editingFieldName: string;
  fieldNames = {
    role: 'role',
  };

  constructor() {
    this.saveRequested = new EventEmitter<Partial<Member>>();
    this.memberFormGroup = new FormGroup({
      [this.fieldNames.role]: new FormControl(1000, Validators.required)
    });
    this.editingFieldName = '';
  }

  ngOnInit(): void {
    if (this.member) {
      this.memberFormGroup.setValue({
        [this.fieldNames.role]: this.member.role
      });
    }

    this.memberRoleItems = getProjectMemberRoleItems();
  }

  get memberIsCreator(): boolean {
    return this.member?.role === ProjectMemberRole.Creator;
  }

  get memberFormContentStatus(): MemberFormContent {
    if (this.memberIsEditable) {
      if (this.memberIsCreator) {
        return MemberFormContent.CreatorRoleRestrictionMessage;
      } else if (this.member?.userId === this.loggedInUserId) {
        return MemberFormContent.OwnRoleRestrictionMessage;
      } else {
        return MemberFormContent.DefaultContent;
      }
    } else {
      return MemberFormContent.DefaultContent;
    }
  }

  getProjectMemberRoleItem(memberRole: ProjectMemberRole): ProjectMemberRoleItem {
    return getProjectMemberRoleItem(memberRole);
  }

  setEditingField(fieldName: string): void {
    if (this.memberIsEditable && !this.memberIsCreator) {
      this.editingFieldName = fieldName;
    }
  }

  saveField(fieldName: string): void {
    this.saveRequested.emit({
      [fieldName]: this.memberFormGroup.get(fieldName)?.value
    });

    this.editingFieldName = '';
  }

  cancelEdit(fieldName: string): void {
    if (this.member) {
      this.memberFormGroup.get(fieldName)?.setValue(this.member[fieldName as keyof Member]);
      this.editingFieldName = '';
    }
  }
}
