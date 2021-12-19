import { ProgressStatus } from './progress-status.enum';
import { Member } from './member.model';
import { Project } from './project.model';

export interface Task {
  _id: string;
  title: string;
  project: Project;
  status: ProgressStatus;
  description: string;
  assignee: Member;
  assigneeUserId: string;
  createdAt: string;
  updatedAt: string;
}

export function createTask(params: Partial<Task>) {
  return {

  } as Task;
}
