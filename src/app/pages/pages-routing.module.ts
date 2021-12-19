import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: '',
    pathMatch: 'full',
    redirectTo: 'landing'
  }, {
    path: 'landing',
    loadChildren: () => import('./landing/landing.module').then(module => module.LandingModule)
  }, {
    path: 'profiles',
    canActivate: [AuthGuard],
    loadChildren: () => import('./profiles/profiles.module').then(module => module.ProfilesModule)
  }, {
    path: 'projects',
    canActivate: [AuthGuard],
    loadChildren: () => import('./projects/projects.module').then(module => module.ProjectsModule)
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
export class PagesRoutingModule { }
