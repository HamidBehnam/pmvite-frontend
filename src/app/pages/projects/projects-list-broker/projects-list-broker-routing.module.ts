import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsListBrokerComponent } from './projects-list-broker.component';

const routes: Routes = [{
  path: '',
  component: ProjectsListBrokerComponent
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
export class ProjectsListBrokerRoutingModule { }
