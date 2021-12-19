import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfilesListBrokerComponent } from './profiles-list-broker.component';

const routes: Routes = [{
  path: '',
  component: ProfilesListBrokerComponent
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
export class ProfilesListBrokerRoutingModule { }
