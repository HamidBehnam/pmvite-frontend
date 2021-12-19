import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Project } from '../../types/project.model';
import { getProgressStatusItems, ProgressStatusItem } from '../../types/progress-status-item.model';
import { Subject, Subscription } from 'rxjs';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit, OnDestroy {
  @Input() project?: Project;
  @Input() formResetSignal: Subject<void>;
  @Output() save: EventEmitter<Partial<Project>>;
  @ViewChild('projectFormRef') projectFormRef?: FormGroupDirective;
  projectFormGroup: FormGroup;
  statusItems!: ProgressStatusItem[];
  formResetSignalSubscription?: Subscription;
  editingFieldName: string;

  constructor(public uiService: UiService) {
    this.save = new EventEmitter<Partial<Project>>();
    this.projectFormGroup = new FormGroup({
      title: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      objectives: new FormControl('', Validators.required),
      description: new FormControl('')
    });
    this.formResetSignal = new Subject<void>();
    this.editingFieldName = '';
  }

  ngOnInit(): void {
    if (this.project) {
      this.projectFormGroup.setValue({
        title: this.project.title,
        status: this.project.status,
        objectives: this.project.objectives,
        description: this.project.description
      });
    }

    this.statusItems = getProgressStatusItems();
    this.formResetSignalSubscription = this.formResetSignal.subscribe(_ => this.resetForm());
  }

  submitForm(): void {
    if (this.projectFormGroup.valid) {
      this.save.emit(this.projectFormGroup.value);
    }
  }

  resetForm(): void {
    this.projectFormGroup.reset();
    this.projectFormRef?.resetForm();
  }

  triggerFormSubmission(): void {
    if (this.projectFormRef) {
      this.projectFormRef.onSubmit(new Event('submit'));
    }
  }

  setEditingField(fieldName: string): void {
    this.editingFieldName = fieldName;
  }

  preview(fieldName: string): void {
    this.editingFieldName = '';
  }

  ngOnDestroy(): void {
    this.formResetSignalSubscription?.unsubscribe();
  }
}
