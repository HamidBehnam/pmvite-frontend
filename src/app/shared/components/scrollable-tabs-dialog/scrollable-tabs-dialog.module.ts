import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollableTabsDialogComponent } from './scrollable-tabs-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    ScrollableTabsDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class ScrollableTabsDialogModule { }
