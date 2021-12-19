import { FileReference } from './file-reference.model';
import { FileSpecification } from './file-specification.model';
import { Task } from './task.model';
import { Project } from './project.model';
import { Member } from './member.model';

export interface Profile {
  _id: string;
  firstName: string;
  lastName: string;
  title: string;
  userId: string;
  image: FileReference;
  originalImageLink: string;
  fullName: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  activeTasks: Task[];
  acceptedTasks: Task[];
  createdProjects: Project[];
  externalCollaborations: Member[];
  viewerIsCreator: boolean;
}

export function createProfile(params: Partial<Profile>): Profile {
  return {

  } as Profile;
}

export function getProfileImageSpecification(): FileSpecification {
  return {
    acceptedFileTypes: 'image/png,image/jpeg,image/gif,image/svg+xml',
    acceptedFileSize: 2000000
  };
}
