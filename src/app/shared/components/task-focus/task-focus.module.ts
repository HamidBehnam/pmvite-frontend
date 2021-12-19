import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskFocusComponent } from './task-focus.component';
import { MatButtonModule } from '@angular/material/button';
import { TaskDetailModule } from '../task-detail/task-detail.module';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { ContentCopierModule } from '../content-copier/content-copier.module';



@NgModule({
  declarations: [
    TaskFocusComponent
  ],
  exports: [
    TaskFocusComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    TaskDetailModule,
    ContentCopierModule
  ]
})
export class TaskFocusModule { }
