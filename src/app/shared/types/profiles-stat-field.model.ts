import { ProfilesStat } from './profiles-stat.enum';

export interface ProfilesStatField {
  name: string;
  title: string;
}

export function getProfilesStatFields(): ProfilesStatField[] {
  return [
    {
      name: ProfilesStat.ActiveTasksStat,
      title: 'Active Tasks'
    },
    {
      name: ProfilesStat.AcceptedTasksStat,
      title: 'Accepted Tasks'
    },
    {
      name: ProfilesStat.CreatedProjectsStat,
      title: 'Created Projects'
    },
    {
      name: ProfilesStat.ExternalCollaborationsStat,
      title: 'External Collaborations'
    }
  ];
}
