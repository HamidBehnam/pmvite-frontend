import { FileReference } from './file-reference.model';
import { ProgressStatus } from './progress-status.enum';
import { Profile } from './profile.model';
import { ProjectMemberRole } from './project-member-role.enum';
import { FileSpecification } from './file-specification.model';
import { Member } from './member.model';
import { Task } from './task.model';

export interface Project {
  _id: string;
  title: string;
  description: string;
  status: ProgressStatus;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  objectives: string;
  image: FileReference;
  creatorProfile: Profile;
  attachments: string[];
  tasks: string[];
  members: string[];
  membersQueried: Member[];
  acceptedTasks: Task[];
  activeTasks: Task[];
  availableTasks: Task[];
  attachmentsQueried: FileReference[];
  viewerIsCreator: boolean;
  viewerAssociatedRole: ProjectMemberRole;
}

export function createProject(params: Partial<Project>): Project {
  return {

  } as Project;
}

export function getProjectImageSpecification(): FileSpecification {
  return {
    acceptedFileTypes: 'image/png,image/jpeg,image/gif,image/svg+xml',
    acceptedFileSize: 2000000
  };
}

export function getProjectAttachmentSpecification(): FileSpecification {
  return {
    acceptedFileTypes: 'application/pdf,application/msword,' +
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-powerpoint,' +
      'application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.ms-excel,' +
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,image/png,image/jpeg,text/plain',
    acceptedFileSize: 5000000
  };
}
