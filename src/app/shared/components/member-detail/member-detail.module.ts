import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberDetailComponent } from './member-detail.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TipCardModule } from '../tip-card/tip-card.module';
import { PmAutofocusModule } from '../../directives/pm-autofocus/pm-autofocus.module';



@NgModule({
  declarations: [
    MemberDetailComponent
  ],
  exports: [
    MemberDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    TipCardModule,
    PmAutofocusModule
  ]
})
export class MemberDetailModule { }
