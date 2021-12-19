import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../../types/task.model';
import { ProgressStatus } from '../../types/progress-status.enum';
import { getProgressStatusItem, ProgressStatusItem } from '../../types/progress-status-item.model';
import { Project } from '../../types/project.model';

@Component({
  selector: 'app-user-tasks-list',
  templateUrl: './user-tasks-list.component.html',
  styleUrls: ['./user-tasks-list.component.scss']
})
export class UserTasksListComponent implements OnInit {

  @Input() tasks?: Task[];
  @Output() showTask: EventEmitter<Task>;
  @Output() showProject: EventEmitter<Project>;
  openedPanelIndex?: number;

  constructor() {
    this.showTask = new EventEmitter<Task>();
    this.showProject = new EventEmitter<Project>();
  }

  ngOnInit(): void {
  }

  getProgressStatusItem(progressStatus: ProgressStatus): ProgressStatusItem {
    return getProgressStatusItem(progressStatus);
  }

  goToTaskPage(task: Task): void {
    this.showTask.emit(task);
  }

  goToProjectPage(project: Project): void {
    this.showProject.emit(project);
  }

  setCurrentPanelIndex(index: number): void {
    this.openedPanelIndex = index;
  }

  clearCurrentPanelIndex(index: number): void {
    if (this.openedPanelIndex === index) {
      this.openedPanelIndex = undefined;
    }
  }
}
