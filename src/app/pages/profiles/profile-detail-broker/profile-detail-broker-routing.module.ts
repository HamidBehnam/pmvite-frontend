import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileDetailBrokerComponent } from './profile-detail-broker.component';

const routes: Routes = [{
  path: '',
  component: ProfileDetailBrokerComponent
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
export class ProfileDetailBrokerRoutingModule { }
