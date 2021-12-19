import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilesListComponent } from './profiles-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProfilesFilterSortModule } from '../profiles-filter-sort/profiles-filter-sort.module';
import { WithAuthModule } from '../../pipes/with-auth/with-auth.module';



@NgModule({
  declarations: [
    ProfilesListComponent
  ],
  exports: [
    ProfilesListComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatPaginatorModule,
    RouterModule,
    ProfilesFilterSortModule,
    WithAuthModule
  ]
})
export class ProfilesListModule { }
