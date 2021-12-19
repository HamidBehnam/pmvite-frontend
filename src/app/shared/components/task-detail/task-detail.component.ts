import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from 'src/app/shared/types/task.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProgressStatus } from '../../types/progress-status.enum';
import { getProgressStatusItem, getProgressStatusItems, ProgressStatusItem } from '../../types/progress-status-item.model';
import { Member } from '../../types/member.model';
import { FormInteractionResult } from '../../types/form-interacation-result.model';
import { UiService } from '../../services/ui.service';
import { labelShowHideTrigger } from '../../animations/label-show-hide-trigger';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
  animations: [
    labelShowHideTrigger
  ]
})
export class TaskDetailComponent implements OnInit {

  @Input() task?: Task;
  @Input() members?: Member[];
  @Input() canEdit?: boolean;
  @Output() saveRequested: EventEmitter<FormInteractionResult<Task>>;
  taskFormGroup: FormGroup;
  statusItems!: ProgressStatusItem[];
  editingFieldName: string;
  fieldNames = {
    title: 'title',
    status: 'status',
    assignee: 'assignee',
    description: 'description'
  };

  constructor(public uiService: UiService) {
    this.taskFormGroup = new FormGroup({
      [this.fieldNames.title]: new FormControl('', Validators.required),
      [this.fieldNames.status]: new FormControl('', Validators.required),
      [this.fieldNames.assignee]: new FormControl(''),
      [this.fieldNames.description]: new FormControl('')
    });
    this.saveRequested = new EventEmitter<FormInteractionResult<Task>>();
    this.editingFieldName = '';
  }

  ngOnInit(): void {
    if (this.task) {
      this.taskFormGroup.patchValue({
        [this.fieldNames.title]: this.task.title,
        [this.fieldNames.status]: this.task.status,
        [this.fieldNames.assignee]: this.task.assignee?._id || 'Unassigned',
        [this.fieldNames.description]: this.task.description
      });
    }

    this.statusItems = getProgressStatusItems();
  }

  getProgressStatusItem(progressStatus: ProgressStatus): ProgressStatusItem {
    return getProgressStatusItem(progressStatus);
  }

  getAssigneeName(task: Task): string {
    return task.assignee?.profile?.fullName || 'Unassigned';
  }

  setEditingField(fieldName: string): void {
    if (this.canEdit) {
      this.editingFieldName = fieldName;
    }
  }

  saveField(fieldName: string): void {
    if (this.task) {

      const formControl = this.taskFormGroup.get(fieldName);
      formControl?.updateValueAndValidity();

      if (formControl?.valid) {
        let fieldValue = formControl?.value;
        fieldValue = fieldName === this.fieldNames.assignee && fieldValue === 'Unassigned' ? null : fieldValue;

        const formInteractionResult: FormInteractionResult<Task> = {
          id: this.task._id,
          payload: {
            [fieldName]: fieldValue
          },
          ...(fieldName === this.fieldNames.assignee) && {
            storePayload: {
              [fieldName]: this.members?.find((member => member._id === fieldValue))
            }
          }
        };

        this.saveRequested.emit(formInteractionResult);

        this.editingFieldName = '';
      }
    }
  }

  cancelEdit(fieldName: string): void {
    if (this.task) {
      let fieldInitialValue;

      switch (fieldName) {
        case this.fieldNames.assignee:
          const taskAssignee = (this.task[fieldName as keyof Task] as Member);
          fieldInitialValue = taskAssignee ? taskAssignee._id : 'Unassigned';
          break;
        default:
          fieldInitialValue = this.task[fieldName as keyof Task];
          break;
      }

      this.taskFormGroup.get(fieldName)?.setValue(fieldInitialValue);
      this.editingFieldName = '';
    }
  }
}
