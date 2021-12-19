import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { HeaderModule } from '../shared/components/header/header.module';
import { FooterModule } from '../shared/components/footer/footer.module';
import { ConfirmationDialogModule } from '../shared/components/confirmation-dialog/confirmation-dialog.module';
import { TermsAndConditionsDialogModule } from '../shared/components/terms-and-conditions-dialog/terms-and-conditions-dialog.module';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    PagesComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    HeaderModule,
    FooterModule,
    ConfirmationDialogModule,
    TermsAndConditionsDialogModule,
    MatDialogModule
  ]
})
export class PagesModule { }
