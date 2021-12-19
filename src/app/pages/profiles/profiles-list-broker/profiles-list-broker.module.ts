import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilesListBrokerRoutingModule } from './profiles-list-broker-routing.module';
import { ProfilesListModule } from '../../../shared/components/profiles-list/profiles-list.module';
import { ProfilesListBrokerComponent } from './profiles-list-broker.component';



@NgModule({
  declarations: [
    ProfilesListBrokerComponent
  ],
  imports: [
    CommonModule,
    ProfilesListBrokerRoutingModule,
    ProfilesListModule
  ]
})
export class ProfilesListBrokerModule { }
