import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileDetailBrokerComponent } from './profile-detail-broker.component';
import { ProfileDetailBrokerRoutingModule } from './profile-detail-broker-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FileSelectionModule } from '../../../shared/components/file-selection/file-selection.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { UserProjectsListModule } from '../../../shared/components/user-projects-list/user-projects-list.module';
import { UserTasksListModule } from '../../../shared/components/user-tasks-list/user-tasks-list.module';
import { UserSettingsListModule } from '../../../shared/components/user-settings-list/user-settings-list.module';
import { MatBadgeModule } from '@angular/material/badge';
import { ProfileGeneralModule } from '../../../shared/components/profile-general/profile-general.module';
import { ScrollableTabsDialogModule } from '../../../shared/components/scrollable-tabs-dialog/scrollable-tabs-dialog.module';
import { WithAuthModule } from '../../../shared/pipes/with-auth/with-auth.module';



@NgModule({
  declarations: [
    ProfileDetailBrokerComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTabsModule,
    MatIconModule,
    MatBadgeModule,
    FileSelectionModule,
    ProfileGeneralModule,
    ProfileDetailBrokerRoutingModule,
    UserProjectsListModule,
    UserTasksListModule,
    UserSettingsListModule,
    ScrollableTabsDialogModule,
    WithAuthModule
  ]
})
export class ProfileDetailBrokerModule { }
