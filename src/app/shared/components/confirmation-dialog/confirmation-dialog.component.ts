import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationDialogModel } from './types/confirmation-dialog.model';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  dataDefaultValues: ConfirmationDialogModel = {
    title: 'Are you sure?',
    message: 'You can\'t undo this action.',
    okLabel: 'OK',
    cancelLabel: 'Cancel'
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogModel) { }

  ngOnInit(): void {
    this.data = {
      ...this.dataDefaultValues,
      ...this.data
    };
  }

}
