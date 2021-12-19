import { Component, OnInit } from '@angular/core';
import { AppQuery } from '../../../state/app.query';

@Component({
  selector: 'app-info-widget',
  templateUrl: './info-widget.component.html',
  styleUrls: ['./info-widget.component.scss']
})
export class InfoWidgetComponent implements OnInit {

  constructor(public appQuery: AppQuery) {
  }

  ngOnInit(): void {
  }

}
