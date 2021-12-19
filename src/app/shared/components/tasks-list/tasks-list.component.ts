import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Task } from '../../types/task.model';
import { Project } from '../../types/project.model';
import { ProgressStatus } from '../../types/progress-status.enum';
import { getProgressStatusItem, ProgressStatusItem } from '../../types/progress-status-item.model';
import { FormInteractionResult } from '../../types/form-interacation-result.model';
import { Member } from '../../types/member.model';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() project?: Project;
  @Input() tasks?: Task[];
  @Input() members?: Member[];
  @Input() canEdit?: boolean;
  @Input() canCreate?: boolean;
  @Input() canDelete?: boolean;
  @Input() taskCreationPanelOpeningSignal: Subject<void>;
  @Output() taskCreationPanelOpened: EventEmitter<void>;
  @Output() taskCreationPanelClosed: EventEmitter<void>;
  @Output() saveRequested: EventEmitter<FormInteractionResult<Task>>;
  @Output() deleteRequested: EventEmitter<string>;
  @Output() taskCreationRequested: EventEmitter<Partial<Task>>;
  @Output() focusViewRequested: EventEmitter<Task>;
  @ViewChild('taskCreationPanel') taskCreationPanel?: MatExpansionPanel;
  taskFormResetSignal: Subject<void>;
  taskCreationPanelOpeningSubscription?: Subscription;
  openedTaskPanelId?: string;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.saveRequested = new EventEmitter<FormInteractionResult<Task>>();
    this.deleteRequested = new EventEmitter<string>();
    this.taskCreationRequested = new EventEmitter<Partial<Task>>();
    this.taskFormResetSignal = new Subject<void>();
    this.focusViewRequested = new EventEmitter<Task>();
    this.taskCreationPanelOpened = new EventEmitter<void>();
    this.taskCreationPanelClosed = new EventEmitter<void>();
    this.taskCreationPanelOpeningSignal = new Subject();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.taskCreationPanelOpeningSubscription = this.taskCreationPanelOpeningSignal.subscribe(_ => {
      this.taskCreationPanel?.open();
      this.changeDetectorRef.detectChanges();
    });
  }

  getProgressStatusItem(progressStatus: ProgressStatus): ProgressStatusItem {
    return getProgressStatusItem(progressStatus);
  }

  saveTask(formInteractionResult: FormInteractionResult<Task>): void {
    this.saveRequested.emit(formInteractionResult);
  }

  deleteTask(task: Task): void {
    this.deleteRequested.emit(task._id);
  }

  createTask(taskData: Partial<Task>): void {
    this.taskCreationRequested.emit(taskData);
    this.taskCreationPanel?.close();
  }

  onTaskCreationPanelOpened(): void {
    this.taskCreationPanelOpened.emit();
  }

  onTaskCreationPanelClosed(): void {
    this.taskFormResetSignal.next();
    this.taskCreationPanelClosed.emit();
  }

  openInFocusView(task: Task): void {
    this.focusViewRequested.emit(task);
  }

  onTaskDetailPanelOpened(task: Task): void {
    this.openedTaskPanelId = task._id;
  }

  onTaskDetailPanelClosed(task: Task): void {
    if (this.openedTaskPanelId === task._id) {
      this.openedTaskPanelId = undefined;
    }
  }

  ngOnDestroy(): void {
    this.taskCreationPanelOpeningSubscription?.unsubscribe();
  }
}
