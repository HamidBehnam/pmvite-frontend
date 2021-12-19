import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTasksListComponent } from './user-tasks-list.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TipCardModule } from '../tip-card/tip-card.module';



@NgModule({
    declarations: [
      UserTasksListComponent
    ],
    exports: [
      UserTasksListComponent
    ],
    imports: [
      CommonModule,
      MatExpansionModule,
      MatIconModule,
      MatButtonModule,
      TipCardModule
    ]
})
export class UserTasksListModule { }
