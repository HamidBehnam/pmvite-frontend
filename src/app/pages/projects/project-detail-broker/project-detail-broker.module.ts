import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDetailBrokerComponent } from './project-detail-broker.component';
import { ProjectDetailBrokerRoutingModule } from './project-detail-broker-routing.module';
import { MatCardModule } from '@angular/material/card';
import { FileSelectionModule } from '../../../shared/components/file-selection/file-selection.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MembersListModule } from '../../../shared/components/members-list/members-list.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TasksListModule } from '../../../shared/components/tasks-list/tasks-list.module';
import { TaskFocusModule } from '../../../shared/components/task-focus/task-focus.module';
import { AttachmentsListModule } from '../../../shared/components/attachments-list/attachments-list.module';
import { AttachmentFocusModule } from '../../../shared/components/attachment-focus/attachment-focus.module';
import { ProjectSettingsListModule } from '../../../shared/components/project-settings-list/project-settings-list.module';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { ProjectGeneralModule } from '../../../shared/components/project-general/project-general.module';
import { NgxJdenticonModule } from 'ngx-jdenticon';
import { ScrollableTabsDialogModule } from '../../../shared/components/scrollable-tabs-dialog/scrollable-tabs-dialog.module';
import { WithAuthModule } from '../../../shared/pipes/with-auth/with-auth.module';



@NgModule({
  declarations: [
    ProjectDetailBrokerComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatTabsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatIconModule,
    FileSelectionModule,
    ProjectDetailBrokerRoutingModule,
    ProjectGeneralModule,
    MembersListModule,
    TasksListModule,
    TaskFocusModule,
    AttachmentsListModule,
    AttachmentFocusModule,
    ProjectSettingsListModule,
    NgxJdenticonModule,
    ScrollableTabsDialogModule,
    WithAuthModule
  ]
})
export class ProjectDetailBrokerModule { }
