import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WithAuthPipe } from './with-auth.pipe';



@NgModule({
  declarations: [
    WithAuthPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    WithAuthPipe
  ]
})
export class WithAuthModule { }
