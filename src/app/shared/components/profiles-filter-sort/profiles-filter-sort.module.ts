import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilesFilterSortComponent } from './profiles-filter-sort.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';



@NgModule({
    declarations: [
      ProfilesFilterSortComponent
    ],
    exports: [
      ProfilesFilterSortComponent
    ],
    imports: [
      CommonModule,
      ReactiveFormsModule,
      MatIconModule,
      MatButtonModule,
      MatMenuModule,
      MatCheckboxModule,
      MatRadioModule,
      MatDividerModule
    ]
})
export class ProfilesFilterSortModule { }
