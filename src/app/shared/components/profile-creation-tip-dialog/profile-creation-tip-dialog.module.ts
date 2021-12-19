import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileCreationTipDialogComponent } from './profile-creation-tip-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    ProfileCreationTipDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class ProfileCreationTipDialogModule { }
