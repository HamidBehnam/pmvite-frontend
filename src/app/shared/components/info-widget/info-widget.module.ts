import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoWidgetComponent } from './info-widget.component';



@NgModule({
    declarations: [
        InfoWidgetComponent
    ],
    exports: [
        InfoWidgetComponent
    ],
    imports: [
        CommonModule
    ]
})
export class InfoWidgetModule { }
