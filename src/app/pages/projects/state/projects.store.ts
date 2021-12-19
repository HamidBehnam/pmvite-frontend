import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Project } from '../../../shared/types/project.model';

export interface ProjectsState extends EntityState<Project> {
  selectedProject: Project | null;
  totalCount: number;
}

export function createInitialProjectsState(): ProjectsState {
  return {
    selectedProject: null,
    totalCount: 0
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'projects', idKey: '_id' })
export class ProjectsStore extends EntityStore<ProjectsState> {

  constructor() {
    super(createInitialProjectsState());
  }

}
