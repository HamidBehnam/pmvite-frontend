import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../../types/profile.model';
import { ProfilesHelpersService } from '../../services/profiles-helpers.service';
import { ProjectMemberRole } from '../../types/project-member-role.enum';
import { getProjectMemberRoleItem, ProjectMemberRoleItem } from '../../types/project-member-role-item.model';
import { PageEvent } from '@angular/material/paginator';
import { PaginationMeta } from '../../types/pagination-meta.type';
import { ProfilesFilterSortSelection } from '../../types/profiles-filter-sort-selection.type';

@Component({
  selector: 'app-profiles-list',
  templateUrl: './profiles-list.component.html',
  styleUrls: ['./profiles-list.component.scss']
})
export class ProfilesListComponent implements OnInit {

  @Input() profiles$?: Observable<Profile[]>;
  @Input() paginationMeta?: PaginationMeta;
  @Input() filterAndSortSelection?: ProfilesFilterSortSelection;
  @Output() paginationChanged: EventEmitter<PageEvent>;
  @Output() filterAndSortChanged: EventEmitter<ProfilesFilterSortSelection>;

  constructor(public profilesHelpersService: ProfilesHelpersService) {
    this.paginationChanged = new EventEmitter<PageEvent>();
    this.filterAndSortChanged = new EventEmitter<ProfilesFilterSortSelection>();
  }

  ngOnInit(): void {
  }

  getProjectMemberRoleItem(memberRole: ProjectMemberRole): ProjectMemberRoleItem {
    return getProjectMemberRoleItem(memberRole);
  }

  paginationChangeEmitter(pageEvent: PageEvent): void {
    this.paginationChanged.emit(pageEvent);
  }

  filterAndSortChangeEmitter(profilesFilterSortSelection: ProfilesFilterSortSelection): void {
    this.filterAndSortChanged.emit(profilesFilterSortSelection);
  }

  hasNoActivity(profile: Profile): boolean {
    return !profile.createdProjects.length &&
      !profile.externalCollaborations.length &&
      !profile.activeTasks.length &&
      !profile.acceptedTasks.length;
  }
}
