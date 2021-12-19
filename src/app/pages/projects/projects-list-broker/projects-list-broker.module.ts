import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsListBrokerComponent } from './projects-list-broker.component';
import { ProjectsListBrokerRoutingModule } from './projects-list-broker-routing.module';
import { ProjectsListModule } from '../../../shared/components/projects-list/projects-list.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ProfileCreationTipDialogModule } from '../../../shared/components/profile-creation-tip-dialog/profile-creation-tip-dialog.module';



@NgModule({
  declarations: [
    ProjectsListBrokerComponent
  ],
  imports: [
    CommonModule,
    ProjectsListBrokerRoutingModule,
    ProjectsListModule,
    MatDialogModule,
    ProfileCreationTipDialogModule
  ]
})
export class ProjectsListBrokerModule { }
