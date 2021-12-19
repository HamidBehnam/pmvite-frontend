import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsListComponent } from './projects-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProjectsFilterSortModule } from '../projects-filter-sort/projects-filter-sort.module';
import { NgxJdenticonModule } from 'ngx-jdenticon';



@NgModule({
  declarations: [
    ProjectsListComponent
  ],
  exports: [
    ProjectsListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatPaginatorModule,
    ProjectsFilterSortModule,
    NgxJdenticonModule
  ]
})
export class ProjectsListModule { }
