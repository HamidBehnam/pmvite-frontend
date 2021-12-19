import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutDialogComponent } from './about-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    AboutDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class AboutDialogModule { }
