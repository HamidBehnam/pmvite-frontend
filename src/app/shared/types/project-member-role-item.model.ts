import { ProjectMemberRole } from './project-member-role.enum';

export interface ProjectMemberRoleItem {
  role: ProjectMemberRole;
  title: string;
}

export function getProjectMemberRoleItems(includeCreator?: boolean): ProjectMemberRoleItem[] {
    return [
      {
        role: ProjectMemberRole.Contributor,
        title: 'Contributor'
      },
      {
        role: ProjectMemberRole.Developer,
        title: 'Developer'
      },
      {
        role: ProjectMemberRole.Admin,
        title: 'Admin'
      },
      ...includeCreator ? [{
        role: ProjectMemberRole.Creator,
        title: 'Creator'
      }] : []
    ];
}

export function getProjectMemberRoleItem(memberRole: ProjectMemberRole): ProjectMemberRoleItem {

  const projectMemberRoleItems = getProjectMemberRoleItems(true);

  return projectMemberRoleItems.find(roleItem => roleItem.role === memberRole) || projectMemberRoleItems[0];
}
