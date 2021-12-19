import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProjectsQuery } from '../state/projects.query';
import { ProjectsService } from '../state/projects.service';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { Project } from '../../../shared/types/project.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationMeta } from '../../../shared/types/pagination-meta.type';
import { ListMetaService } from '../../../shared/services/list-meta.service';
import { PageEvent } from '@angular/material/paginator';
import { ProjectsFilterSortSelection } from '../../../shared/types/projects-filter-sort-selection.type';
import { MatDialog } from '@angular/material/dialog';
import { ProfileCreationTipDialogComponent } from '../../../shared/components/profile-creation-tip-dialog/profile-creation-tip-dialog.component';
import { AppQuery } from '../../../state/app.query';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-projects-list-broker',
  templateUrl: './projects-list-broker.component.html',
  styleUrls: ['./projects-list-broker.component.scss']
})
export class ProjectsListBrokerComponent implements OnInit, OnDestroy {

  projects$: Observable<Project[]>;
  paginationMeta?: PaginationMeta;
  filterAndSortSelection?: ProjectsFilterSortSelection;
  userAndProfileSubscription?: Subscription;

    constructor(
      private projectsService: ProjectsService,
      private projectsQuery: ProjectsQuery,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private listMetaService: ListMetaService,
      private matDialog: MatDialog,
      private appQuery: AppQuery,
      private authService: AuthService
    ) {
      this.projects$ = this.projectsQuery.selectAll();
    }

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .subscribe(params => {
        this.projectsService.getProjects({
          ...params,
          excludeInactive: true.toString()
        }).subscribe(_ => {
          this.paginationMeta = {
            length: this.projectsQuery.getValue().totalCount,
            pageSize: params['limit'] || this.listMetaService.defaultPageSize,
            pageIndex: params['page'] ? params['page'] - 1 : this.listMetaService.defaultPageIndex,
            pageSizeOptions: this.listMetaService.defaultPageSizeOptions
          };
        });

        this.filterAndSortSelection = {
          stat: params['stat'] || [],
          sort: params['sort'] || this.listMetaService.defaultSort
        };
      });

    this.showProfileCreationTipIfNeeded();
  }

  paginationChangeHandler(pageEvent: PageEvent): void {
    const params: any = {
      ...this.activatedRoute.snapshot.queryParams,
      limit: pageEvent.pageSize,
      page: pageEvent.pageIndex + 1
    };

    params.limit = params.limit === this.listMetaService.defaultPageSize ? null : params.limit;

    params.page = params.page === this.listMetaService.defaultPageIndex + 1 ? null : params.page;

    this.router.navigate([], {
      queryParams: {
        ...params
      }
    });
  }

  filterAndSortChangeHandler(projectsFilterSortSelection: ProjectsFilterSortSelection): void {
    const params: any = {
      ...this.activatedRoute.snapshot.queryParams,
      stat: projectsFilterSortSelection.stat,
      sort: projectsFilterSortSelection.sort,
      page: null // reset page to 1
    };

    params.stat = params.stat.length ? params.stat : null;

    params.sort = params.sort === this.listMetaService.defaultSort ? null : params.sort;

    this.router.navigate([], {
      queryParams: {
        ...params
      }
    });
  }

  showProfileCreationTip(userId: string): void {
    const dialogRef = this.matDialog.open(ProfileCreationTipDialogComponent, {
      disableClose: true,
      panelClass: 'profile-creation-tip-dialog-panel'
    });

    dialogRef.afterClosed().subscribe(choice => {
      if (choice) {
        this.router.navigate(['profiles', 'create']);
      }

      localStorage.setItem(`dontShowProfileCreationTip_${userId}`, 'true');
    });
  }

  showProfileCreationTipIfNeeded(): void {
    this.userAndProfileSubscription = combineLatest([
      this.authService.user$,
      this.appQuery.selectUserHasProfile$
    ]).subscribe(([user, userHasProfile]) => {
      if (user && user.sub) {
        if (
          userHasProfile === false &&
          !localStorage.getItem(`dontShowProfileCreationTip_${user.sub}`) &&
          localStorage.getItem('termsAndConditionsAccepted') === 'true'
        ) {
          this.showProfileCreationTip(user.sub);
          this.userAndProfileSubscription?.unsubscribe();
        }
      }
    });
  }

  ngOnDestroy(): void {
      this.userAndProfileSubscription?.unsubscribe();
  }
}
