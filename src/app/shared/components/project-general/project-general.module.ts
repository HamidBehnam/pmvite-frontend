import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectGeneralComponent } from './project-general.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { ProjectDetailModule } from '../project-detail/project-detail.module';



@NgModule({
  declarations: [
    ProjectGeneralComponent
  ],
  exports: [
    ProjectGeneralComponent
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatIconModule,
    ProjectDetailModule
  ]
})
export class ProjectGeneralModule { }
