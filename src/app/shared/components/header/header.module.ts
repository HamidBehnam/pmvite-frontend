import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { NavBarModule } from '../nav-bar/nav-bar.module';



@NgModule({
    declarations: [
      HeaderComponent
    ],
    exports: [
      HeaderComponent
    ],
    imports: [
      CommonModule,
      NavBarModule
    ]
})
export class HeaderModule { }
