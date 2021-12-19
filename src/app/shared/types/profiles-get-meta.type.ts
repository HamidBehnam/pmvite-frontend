import { ListGETRequestMeta } from './list-get-meta.type';

export interface ProfilesGETRequestMeta extends ListGETRequestMeta {
  stat: string[];
  term: string;
  projectId: string;
}
