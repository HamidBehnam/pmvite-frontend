import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDetailComponent } from './project-detail.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { QuillModule } from 'ngx-quill';
import { TipCardModule } from '../tip-card/tip-card.module';
import { RouterModule } from '@angular/router';
import { PmAutofocusModule } from '../../directives/pm-autofocus/pm-autofocus.module';



@NgModule({
  declarations: [
    ProjectDetailComponent
  ],
  exports: [
    ProjectDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    QuillModule,
    TipCardModule,
    PmAutofocusModule
  ]
})
export class ProjectDetailModule { }
