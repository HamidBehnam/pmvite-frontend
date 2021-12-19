import { ListGETRequestMeta } from './list-get-meta.type';

export interface MembersGETRequestMeta extends ListGETRequestMeta {
  role: string[];
  projectId: string;
  userId: string;
}
