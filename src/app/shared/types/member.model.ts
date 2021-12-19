import { Project } from './project.model';
import { Profile } from './profile.model';
import { ProjectMemberRole } from './project-member-role.enum';

export interface Member {
  _id: string;
  userId: string;
  project: Project;
  profile: Profile;
  role: ProjectMemberRole;
  createdAt: string;
  updatedAt: string;
}

export function createMember(params: Partial<Member>) {
  return {

  } as Member;
}
