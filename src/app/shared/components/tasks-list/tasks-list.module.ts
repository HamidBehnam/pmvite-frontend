import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksListComponent } from './tasks-list.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { TaskDetailModule } from '../task-detail/task-detail.module';
import { TaskFormModule } from '../task-form/task-form.module';
import { TipCardModule } from '../tip-card/tip-card.module';



@NgModule({
    declarations: [
      TasksListComponent
    ],
    exports: [
      TasksListComponent
    ],
    imports: [
      CommonModule,
      MatExpansionModule,
      MatButtonModule,
      MatDividerModule,
      MatIconModule,
      TaskDetailModule,
      TaskFormModule,
      TipCardModule
    ]
})
export class TasksListModule { }
