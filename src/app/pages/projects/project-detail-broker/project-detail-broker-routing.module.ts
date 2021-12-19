import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDetailBrokerComponent } from './project-detail-broker.component';

const routes: Routes = [{
  path: '',
  component: ProjectDetailBrokerComponent
}];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProjectDetailBrokerRoutingModule { }
