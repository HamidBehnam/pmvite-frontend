import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileCreationBrokerComponent } from './profile-creation-broker.component';
import { ProfileCreationBrokerRoutingModule } from './profile-creation-broker-routing.module';
import { ProfileFormModule } from '../../../shared/components/profile-form/profile-form.module';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    ProfileCreationBrokerComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    ProfileCreationBrokerRoutingModule,
    ProfileFormModule,
    MatSnackBarModule
  ]
})
export class ProfileCreationBrokerModule { }
