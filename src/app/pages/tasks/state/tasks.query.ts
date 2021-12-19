import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { TasksStore, TasksState } from './tasks.store';

@Injectable({ providedIn: 'root' })
export class TasksQuery extends QueryEntity<TasksState> {

  selectSelectedTask$ = this.select('selectedTask');

  constructor(protected store: TasksStore) {
    super(store);
  }

}
