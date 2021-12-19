import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../../types/task.model';
import { FormInteractionResult } from '../../types/form-interacation-result.model';
import { Member } from '../../types/member.model';

@Component({
  selector: 'app-task-focus',
  templateUrl: './task-focus.component.html',
  styleUrls: ['./task-focus.component.scss']
})
export class TaskFocusComponent implements OnInit {

  @Input() task?: Task;
  @Input() members?: Member[];
  @Input() canEdit?: boolean;
  @Input() taskDirectLink: string;
  @Output() projectTasksListRequested: EventEmitter<void>;
  @Output() saveRequested: EventEmitter<FormInteractionResult<Task>>;

  constructor() {
    this.projectTasksListRequested = new EventEmitter<void>();
    this.saveRequested = new EventEmitter<FormInteractionResult<Task>>();
    this.taskDirectLink = '';
  }

  ngOnInit(): void {
  }

  showProjectTasks(): void {
    this.projectTasksListRequested.emit();
  }

  saveTask(formInteractionResult: FormInteractionResult<Task>): void {
    this.saveRequested.emit(formInteractionResult);
  }
}
