import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  redirectTo: 'list',
  pathMatch: 'full'
}, {
  path: 'list',
  loadChildren: () => import('./projects-list-broker/projects-list-broker.module').then(module => module.ProjectsListBrokerModule)
}, {
  path: ':id',
  loadChildren: () => import('./project-detail-broker/project-detail-broker.module').then(module => module.ProjectDetailBrokerModule)
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
