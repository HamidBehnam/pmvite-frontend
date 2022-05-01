import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttachmentPreviewDialogComponent } from './attachment-preview-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    AttachmentPreviewDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
})
export class AttachmentPreviewDialogModule { }
