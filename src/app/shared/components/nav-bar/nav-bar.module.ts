import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { HelpDialogModule } from '../help-dialog/help-dialog.module';
import { AboutDialogModule } from '../about-dialog/about-dialog.module';
import { WithAuthModule } from '../../pipes/with-auth/with-auth.module';



@NgModule({
    declarations: [
      NavBarComponent
    ],
    exports: [
      NavBarComponent
    ],
    imports: [
      CommonModule,
      RouterModule,
      MatToolbarModule,
      MatButtonModule,
      MatMenuModule,
      MatIconModule,
      MatProgressBarModule,
      MatDialogModule,
      HelpDialogModule,
      AboutDialogModule,
      WithAuthModule
    ]
})
export class NavBarModule { }
