import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersListComponent } from './members-list.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MemberFormModule } from '../member-form/member-form.module';
import { MemberDetailModule } from '../member-detail/member-detail.module';
import { TipCardModule } from '../tip-card/tip-card.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    MembersListComponent,
  ],
  exports: [
    MembersListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MemberFormModule,
    MemberDetailModule,
    TipCardModule
  ]
})
export class MembersListModule { }
