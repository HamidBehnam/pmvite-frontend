import { Component, OnInit } from '@angular/core';
import { AboutDialogComponent } from '../about-dialog/about-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  get currentYear(): number {
    return new Date().getFullYear();
  }

  showAboutDialog(): void {
    const dialogRef = this.matDialog.open(AboutDialogComponent, {
      disableClose: true,
      panelClass: 'about-dialog-panel'
    });

    dialogRef.afterClosed().subscribe(choice => {
      if (choice) {
        // about dialog was closed by clicking the 'close' button
      }
    });
  }
}
