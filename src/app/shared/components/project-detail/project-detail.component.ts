import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from '../../types/project.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getProgressStatusItem, getProgressStatusItems, ProgressStatusItem } from '../../types/progress-status-item.model';
import { ProgressStatus } from '../../types/progress-status.enum';
import { UiService } from '../../services/ui.service';
import { labelShowHideTrigger } from '../../animations/label-show-hide-trigger';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  animations: [
    labelShowHideTrigger
  ]
})
export class ProjectDetailComponent implements OnInit {

  @Input() project?: Project;
  @Input() projectIsEditable?: boolean;
  @Output() saveRequested: EventEmitter<Partial<Project>>;
  projectFormGroup: FormGroup;
  statusItems!: ProgressStatusItem[];
  editingFieldName: string;
  fieldNames = {
    title: 'title',
    status: 'status',
    objectives: 'objectives',
    description: 'description'
  };

  constructor(public uiService: UiService) {
    this.saveRequested = new EventEmitter<Partial<Project>>();
    this.projectFormGroup = new FormGroup({
      [this.fieldNames.title]: new FormControl('', Validators.required),
      [this.fieldNames.status]: new FormControl('', Validators.required),
      [this.fieldNames.objectives]: new FormControl('', Validators.required),
      [this.fieldNames.description]: new FormControl('')
    });
    this.editingFieldName = '';
  }

  ngOnInit(): void {
    if (this.project) {
      this.projectFormGroup.setValue({
        [this.fieldNames.title]: this.project.title,
        [this.fieldNames.status]: this.project.status,
        [this.fieldNames.objectives]: this.project.objectives,
        [this.fieldNames.description]: this.project.description
      });
    }

    this.statusItems = getProgressStatusItems();
  }

  getProgressStatusItem(progressStatus: ProgressStatus): ProgressStatusItem {
    return getProgressStatusItem(progressStatus);
  }

  setEditingField(fieldName: string): void {
    if (this.projectIsEditable) {
      this.editingFieldName = fieldName;
    }
  }

  saveField(fieldName: string): void {
    const formControl = this.projectFormGroup.get(fieldName);
    formControl?.updateValueAndValidity();

    if (formControl?.valid) {

      this.saveRequested.emit({
        [fieldName]: formControl?.value
      });

      this.editingFieldName = '';
    }
  }

  cancelEdit(fieldName: string): void {
    if (this.project) {
      this.projectFormGroup.get(fieldName)?.setValue(this.project[fieldName as keyof Project]);
      this.editingFieldName = '';
    }
  }
}
