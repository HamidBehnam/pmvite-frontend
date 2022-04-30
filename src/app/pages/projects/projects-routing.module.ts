import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: ':id',
  loadChildren: () => import('./project-detail-broker/project-detail-broker.module').then(module => module.ProjectDetailBrokerModule)
}, {
  path: '',
  loadChildren: () => import('./projects-list-broker/projects-list-broker.module').then(module => module.ProjectsListBrokerModule)
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
export class ProjectsRoutingModule { }
