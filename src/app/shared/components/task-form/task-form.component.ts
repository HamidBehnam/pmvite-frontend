import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { getProgressStatusItems, ProgressStatusItem } from '../../types/progress-status-item.model';
import { Member } from '../../types/member.model';
import { Task } from '../../types/task.model';
import { Project } from '../../types/project.model';
import { Subject, Subscription } from 'rxjs';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit, OnDestroy {

  @Input() project?: Project;
  @Input() members?: Member[];
  @Input() formResetSignal: Subject<void>;
  @Output() createTask: EventEmitter<Partial<Task>>;
  @ViewChild('taskFormRef') taskFormRef?: FormGroupDirective;
  taskFormGroup: FormGroup;
  statusItems!: ProgressStatusItem[];
  formResetSignalSubscription?: Subscription;
  editingFieldName: string;

  constructor(public uiService: UiService) {
    this.taskFormGroup = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      status: new FormControl('', Validators.required),
      assignee: new FormControl('Unassigned')
    });

    this.createTask = new EventEmitter<Partial<Task>>();
    this.formResetSignal = new Subject<void>();
    this.editingFieldName = '';
  }

  ngOnInit(): void {
    this.statusItems = getProgressStatusItems();
    this.formResetSignalSubscription = this.formResetSignal.subscribe(_ => this.resetForm());
  }

  submitForm(): void {
    if (this.taskFormGroup.valid) {

      if (this.taskFormGroup.value.assignee === 'Unassigned') {
        this.taskFormGroup.value.assignee = null;
      }

      this.createTask.emit({
        ...this.taskFormGroup.value,
        project: this.project?._id
      });
    }
  }

  resetForm(): void {
    this.taskFormGroup.reset();
    this.taskFormRef?.resetForm();
    this.taskFormGroup.get('assignee')?.setValue('Unassigned');
  }

  triggerFormSubmission(): void {
    if (this.taskFormRef) {
      this.taskFormRef.onSubmit(new Event('submit'));
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
