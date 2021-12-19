import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[app-file-dialog-opener], [appFileDialogOpener]'
})
export class FileDialogOpenerDirective {

  @Output() openDialog: EventEmitter<boolean>;

  constructor() {
    this.openDialog = new EventEmitter();
  }

  @HostListener('click')
  openFileDialog(): void {
    this.openDialog.emit(true);
  }
}
