import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttachmentDetailComponent } from './attachment-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { QuillModule } from 'ngx-quill';
import { PmAutofocusModule } from '../../directives/pm-autofocus/pm-autofocus.module';



@NgModule({
    declarations: [
      AttachmentDetailComponent
    ],
    exports: [
      AttachmentDetailComponent
    ],
    imports: [
      CommonModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatIconModule,
      QuillModule,
      PmAutofocusModule
    ]
})
export class AttachmentDetailModule { }
