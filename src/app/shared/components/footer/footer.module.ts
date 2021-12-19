import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { InfoWidgetModule } from '../info-widget/info-widget.module';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { AboutDialogModule } from '../about-dialog/about-dialog.module';



@NgModule({
    declarations: [
      FooterComponent
    ],
    exports: [
      FooterComponent
    ],
    imports: [
      CommonModule,
      RouterModule,
      MatDividerModule,
      InfoWidgetModule,
      MatDialogModule,
      AboutDialogModule
    ]
})
export class FooterModule { }
