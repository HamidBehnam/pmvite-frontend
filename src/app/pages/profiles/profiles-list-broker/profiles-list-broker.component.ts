import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../../../shared/types/profile.model';
import { ProfilesQuery } from '../state/profiles.query';
import { ProfilesService } from '../state/profiles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { ListMetaService } from '../../../shared/services/list-meta.service';
import { PaginationMeta } from '../../../shared/types/pagination-meta.type';
import { ProfilesFilterSortSelection } from '../../../shared/types/profiles-filter-sort-selection.type';

@Component({
  selector: 'app-profiles-list-broker',
  templateUrl: './profiles-list-broker.component.html',
  styleUrls: ['./profiles-list-broker.component.scss']
})
export class ProfilesListBrokerComponent implements OnInit {

  profiles$: Observable<Profile[]>;
  profilesTotalCount$: Observable<number>;
  paginationMeta?: PaginationMeta;
  filterAndSortSelection?: ProfilesFilterSortSelection;

  constructor(private profilesQuery: ProfilesQuery,
              private profilesService: ProfilesService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private listMetaService: ListMetaService
  ) {
    this.profiles$ = this.profilesQuery.selectAll();
    this.profilesTotalCount$ = this.profilesQuery.selectTotalCount$;
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .subscribe(params => {
        this.profilesService.getProfiles(params).subscribe(_ => {
          this.paginationMeta = {
            length: this.profilesQuery.getValue().totalCount,
            pageSize: params.limit || this.listMetaService.defaultPageSize,
            pageIndex: params.page ? params.page - 1 : this.listMetaService.defaultPageIndex,
            pageSizeOptions: this.listMetaService.defaultPageSizeOptions
          };
        });

        this.filterAndSortSelection = {
          stat: params.stat || [],
          sort: params.sort || this.listMetaService.defaultSort
        };
      });
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

  filterAndSortChangeHandler(profilesFilterSortSelection: ProfilesFilterSortSelection): void {
    const params: any = {
      ...this.activatedRoute.snapshot.queryParams,
      stat: profilesFilterSortSelection.stat,
      sort: profilesFilterSortSelection.sort,
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
}
