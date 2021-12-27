import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  children: [{
    path: 'create',
    loadChildren: () => import('./profile-creation-broker/profile-creation-broker.module')
      .then(module => module.ProfileCreationBrokerModule)
  }, {
    path: ':id',
    loadChildren: () => import('./profile-detail-broker/profile-detail-broker.module')
      .then(module => module.ProfileDetailBrokerModule)
  }, {
    path: '',
    loadChildren: () => import('./profiles-list-broker/profiles-list-broker.module')
      .then(module => module.ProfilesListBrokerModule)
  }]
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
export class ProfilesRoutingModule { }
