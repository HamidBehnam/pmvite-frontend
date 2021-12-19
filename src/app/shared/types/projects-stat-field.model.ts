import { ProjectsStat } from './projects-stat.enum';

export interface ProjectsStatField {
  name: string;
  title: string;
}

export function getProjectsStatFields(): ProjectsStatField[] {
  return [
    {
      name: ProjectsStat.MembersStat,
      title: 'Members'
    },
    {
      name: ProjectsStat.AttachmentsStat,
      title: 'Attachments'
    },
    {
      name: ProjectsStat.ActiveTasksStat,
      title: 'Active Tasks'
    },
    {
      name: ProjectsStat.AcceptedTasksStat,
      title: 'Accepted Tasks'
    },
    {
      name: ProjectsStat.AvailableTasksStat,
      title: 'Available Tasks'
    }
  ];
}
