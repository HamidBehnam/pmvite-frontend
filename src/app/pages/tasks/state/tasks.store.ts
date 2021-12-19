import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Task } from '../../../shared/types/task.model';

export interface TasksState extends EntityState<Task> {
  selectedTask: Task | null;
}

export function createInitialTasksState(): TasksState {
  return {
    selectedTask: null
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tasks', idKey: '_id' })
export class TasksStore extends EntityStore<TasksState> {

  constructor() {
    super(createInitialTasksState());
  }

}
