import { ProfilesSortBy } from './profiles-sort-by.enum';

export interface ProfilesSortByField {
  name: string;
  title: string;
}

export function getProfilesSortByFields(): ProfilesSortByField[] {
  return [
    {
      name: ProfilesSortBy.ActiveTasksStat,
      title: 'Active Tasks'
    },
    {
      name: ProfilesSortBy.AcceptedTasksStat,
      title: 'Accepted Tasks'
    },
    {
      name: ProfilesSortBy.CreatedProjectsStat,
      title: 'Created Projects'
    },
    {
      name: ProfilesSortBy.ExternalCollaborationsStat,
      title: 'External Collaborations'
    },
    {
      name: ProfilesSortBy.FirstName,
      title: 'First name'
    },
    {
      name: ProfilesSortBy.LastName,
      title: 'Last name'
    },
    {
      name: ProfilesSortBy.CreatedAt,
      title: 'Creation date'
    }
  ];
}
