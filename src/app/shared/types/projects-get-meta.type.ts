import { ListGETRequestMeta } from './list-get-meta.type';

export interface ProjectsGETRequestMeta extends ListGETRequestMeta {
  role: string[];
  status: string[];
  stat: string[];
  userId: string;
  excludeInactive: string;
}
