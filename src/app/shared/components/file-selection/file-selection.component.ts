import {
  AfterContentInit,
  Component, ContentChildren,
  ElementRef, EventEmitter,
  Input,
  OnDestroy,
  OnInit, Output, QueryList,
  ViewChild,
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileDialogOpenerDirective } from './file-dialog-opener/file-dialog-opener.directive';

@Component({
  selector: 'app-file-selection',
  templateUrl: './file-selection.component.html',
  styleUrls: ['./file-selection.component.scss']
})
export class FileSelectionComponent implements OnInit, OnDestroy, AfterContentInit {

  @Input() acceptedFileTypes: string;
  @Input() acceptedFileSize: number;
  @Output() fileSelected: EventEmitter<File>;
  @ViewChild('fileSelectorElement') fileSelectorElement!: ElementRef<HTMLElement>;
  @ContentChildren(FileDialogOpenerDirective) fileDialogOpenerDirectives!: QueryList<FileDialogOpenerDirective>;
  destroyed$: Subject<boolean>;
  fileName = '';
  fileUrl: any;
  file?: File;

  constructor(private matSnackBar: MatSnackBar) {
    this.acceptedFileTypes = '';
    this.acceptedFileSize = 100;
    this.destroyed$ = new Subject<boolean>();
    this.fileSelected = new EventEmitter<File>();
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {

    this.fileDialogOpenerDirectives.forEach(fileDialogOpenerDirective =>
      fileDialogOpenerDirective.openDialog
        .pipe(
          takeUntil(this.destroyed$)
        )
        .subscribe(_ => this.showFileSelectorDialog()));
  }

  showFileSelectorDialog(): void {
    this.fileSelectorElement.nativeElement.click();
  }

  onFileSelected(event: any): void {

    this.file = event.target.files[0];

    if (this.file) {

      if (!this.acceptedFileTypes.includes(this.file.type)) {
        const errorMessage = 'File type is not supported.';
        this.snackAlert(errorMessage, 'OK', 5000);
        this.resetSelectorElement();
        return;
      }

      if (this.file.size >=  this.acceptedFileSize) {
        const errorMessage = 'File is too large.';
        this.snackAlert(errorMessage, 'OK', 5000);
        this.resetSelectorElement();
        return;
      }

      this.fileName = this.file.name;

      const fileReader = new FileReader();
      fileReader.readAsDataURL(this.file);
      fileReader.onload = _ => {
        this.fileUrl = fileReader.result;
      };

      this.fileSelected.emit(this.file);
    }
  }

  resetSelectorElement(): void {
    this.fileSelectorElement.nativeElement.setAttribute('type', '');
    this.fileSelectorElement.nativeElement.setAttribute('type', 'file');
  }

  snackAlert(message: string, action: string, duration: number): void {
    this.matSnackBar.open(message, action, {
      duration
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
