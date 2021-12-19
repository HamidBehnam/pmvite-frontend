import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileCreationBrokerComponent } from './profile-creation-broker.component';

const routes: Routes = [{
  path: '',
  component: ProfileCreationBrokerComponent
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
export class ProfileCreationBrokerRoutingModule { }
