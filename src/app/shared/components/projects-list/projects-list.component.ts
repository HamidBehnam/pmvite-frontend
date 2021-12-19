import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from '../../types/project.model';
import { ProjectsHelpersService } from '../../services/projects-helpers.service';
import { ProgressStatus } from '../../types/progress-status.enum';
import { ProgressStatusItem, getProgressStatusItem } from '../../types/progress-status-item.model';
import { PaginationMeta } from '../../types/pagination-meta.type';
import { PageEvent } from '@angular/material/paginator';
import { ProjectsFilterSortSelection } from '../../types/projects-filter-sort-selection.type';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {

  @Input() projects?: Project[];
  @Input() paginationMeta?: PaginationMeta;
  @Input() filterAndSortSelection?: ProjectsFilterSortSelection;
  @Output() paginationChanged: EventEmitter<PageEvent>;
  @Output() filterAndSortChanged: EventEmitter<ProjectsFilterSortSelection>;

  constructor(public projectsHelpersService: ProjectsHelpersService) {
    this.paginationChanged = new EventEmitter<PageEvent>();
    this.filterAndSortChanged = new EventEmitter<ProjectsFilterSortSelection>();
  }

  ngOnInit(): void {
  }

  getProgressStatusItem(progressStatus: ProgressStatus): ProgressStatusItem {
    return getProgressStatusItem(progressStatus);
  }

  paginationChangeEmitter(pageEvent: PageEvent): void {
    this.paginationChanged.emit(pageEvent);
  }

  filterAndSortChangeEmitter(projectsFilterSortSelection: ProjectsFilterSortSelection): void {
    this.filterAndSortChanged.emit(projectsFilterSortSelection);
  }
}
