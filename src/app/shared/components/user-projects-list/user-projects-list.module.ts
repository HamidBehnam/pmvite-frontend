import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProjectsListComponent } from './user-projects-list.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProjectFormModule } from '../project-form/project-form.module';
import { TipCardModule } from '../tip-card/tip-card.module';



@NgModule({
    declarations: [
      UserProjectsListComponent
    ],
    exports: [
      UserProjectsListComponent
    ],
    imports: [
      CommonModule,
      MatExpansionModule,
      MatDividerModule,
      MatButtonModule,
      MatIconModule,
      ProjectFormModule,
      TipCardModule
    ]
})
export class UserProjectsListModule { }
