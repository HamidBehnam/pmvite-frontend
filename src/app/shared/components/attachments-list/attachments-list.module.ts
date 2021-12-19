import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttachmentsListComponent } from './attachments-list.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AttachmentDetailModule } from '../attachment-detail/attachment-detail.module';
import { MatDividerModule } from '@angular/material/divider';
import { FileSelectionModule } from '../file-selection/file-selection.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TipCardModule } from '../tip-card/tip-card.module';



@NgModule({
  declarations: [
    AttachmentsListComponent
  ],
  exports: [
    AttachmentsListComponent
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    AttachmentDetailModule,
    FileSelectionModule,
    TipCardModule
  ]
})
export class AttachmentsListModule { }
