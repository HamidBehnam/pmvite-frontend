import { ListGETRequestMeta } from './list-get-meta.type';

export interface TasksGETRequestMeta extends ListGETRequestMeta {
  status: string[];
  projectId: string;
  assigneeUserId: string;
}
