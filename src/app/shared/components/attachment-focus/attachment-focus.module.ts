import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttachmentFocusComponent } from './attachment-focus.component';
import { MatButtonModule } from '@angular/material/button';
import { AttachmentDetailModule } from '../attachment-detail/attachment-detail.module';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { ContentCopierModule } from '../content-copier/content-copier.module';



@NgModule({
  declarations: [
    AttachmentFocusComponent
  ],
  exports: [
    AttachmentFocusComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    AttachmentDetailModule,
    ContentCopierModule
  ]
})
export class AttachmentFocusModule { }
