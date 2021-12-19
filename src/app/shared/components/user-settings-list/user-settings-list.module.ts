import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSettingsListComponent } from './user-settings-list.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FileSelectionModule } from '../file-selection/file-selection.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TipCardModule } from '../tip-card/tip-card.module';



@NgModule({
  declarations: [
    UserSettingsListComponent
  ],
  exports: [
    UserSettingsListComponent
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    FileSelectionModule,
    TipCardModule
  ]
})
export class UserSettingsListModule { }
