import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileSelectionComponent } from './file-selection.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FileDialogOpenerDirective } from './file-dialog-opener/file-dialog-opener.directive';



@NgModule({
  declarations: [
    FileSelectionComponent,
    FileDialogOpenerDirective
  ],
  exports: [
    FileSelectionComponent,
    FileDialogOpenerDirective
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ]
})
export class FileSelectionModule { }
