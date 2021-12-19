import { ProjectsSortBy } from './projects-sort-by.enum';
import { ProjectsStat } from './projects-stat.enum';

export interface ProjectsSortByField {
  name: string;
  title: string;
}

export function getProjectsSortByFields(): ProjectsSortByField[] {
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
    },
    {
      name: ProjectsSortBy.Title,
      title: 'Title'
    },
    {
      name: ProjectsSortBy.CreatedAt,
      title: 'Creation date'
    }
  ];
}
