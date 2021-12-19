import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PmAutofocusDirective } from './pm-autofocus.directive';



@NgModule({
  declarations: [
    PmAutofocusDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PmAutofocusDirective
  ]
})
export class PmAutofocusModule { }
