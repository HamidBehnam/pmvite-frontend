import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  children: [{
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  }, {
    // TODO: the reason for not using empty path is because Angular downloads the module associated with the empty path anyways even though
    //  the path that the user is trying to load is a sub section for instance /:id
    path: 'list',
    loadChildren: () => import('./profiles-list-broker/profiles-list-broker.module')
      .then(module => module.ProfilesListBrokerModule)
  }, {
    path: 'create',
    loadChildren: () => import('./profile-creation-broker/profile-creation-broker.module')
      .then(module => module.ProfileCreationBrokerModule)
  }, {
    path: ':id',
    loadChildren: () => import('./profile-detail-broker/profile-detail-broker.module')
      .then(module => module.ProfileDetailBrokerModule)
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
