import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FileDownloadMeta} from "../../types/file-download-meta";
import {AttachmentsService} from "../../../pages/attachments/state/attachments.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-attachment-preview-dialog',
  templateUrl: './attachment-preview-dialog.component.html',
  styleUrls: ['./attachment-preview-dialog.component.scss']
})
export class AttachmentPreviewDialogComponent implements OnInit {
  blobUrl?: SafeResourceUrl;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FileDownloadMeta,
    private attachmentsService: AttachmentsService,
    private matSnackBar: MatSnackBar,
    private domSanitizer: DomSanitizer,
  ) {
  }

  ngOnInit(): void {
    this.downloadAttachment(this.data);
  }

  private downloadAttachment(fileDownloadMeta: FileDownloadMeta): void {
    this.attachmentsService.downloadAttachment(fileDownloadMeta.fileUrl)
      .subscribe(data => {

        const blob = new Blob([data], {type: fileDownloadMeta.contentType});

        this.blobUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
      }, _ => this.matSnackBar.open('Something went wrong, please try again later!', 'OK', {duration: 5000}));
  }

  get isImage(): boolean {
    return this.data.contentType.startsWith('image');
  }

  get isPdf(): boolean {
    return this.data.contentType.startsWith('application/pdf');
  }
}
