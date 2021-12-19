import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipCardComponent } from './tip-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    TipCardComponent,
  ],
  exports: [
    TipCardComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
  ]
})
export class TipCardModule { }
