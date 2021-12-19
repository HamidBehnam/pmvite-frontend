import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentCopierComponent } from './content-copier.component';
import { ClipboardModule } from '@angular/cdk/clipboard';



@NgModule({
  declarations: [
    ContentCopierComponent
  ],
  exports: [
    ContentCopierComponent
  ],
  imports: [
    CommonModule,
    ClipboardModule
  ]
})
export class ContentCopierModule { }
