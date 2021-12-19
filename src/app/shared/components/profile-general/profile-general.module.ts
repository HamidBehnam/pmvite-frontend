import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileGeneralComponent } from './profile-general.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { ProfileDetailModule } from '../profile-detail/profile-detail.module';



@NgModule({
  declarations: [
    ProfileGeneralComponent
  ],
  exports: [
    ProfileGeneralComponent
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatIconModule,
    ProfileDetailModule
  ]
})
export class ProfileGeneralModule { }
