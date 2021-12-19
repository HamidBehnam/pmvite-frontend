import { Component, Input, OnInit } from '@angular/core';
import { TipIcon } from './types/tip-icon.type';

@Component({
  selector: 'app-tip-card',
  templateUrl: './tip-card.component.html',
  styleUrls: ['./tip-card.component.scss']
})
export class TipCardComponent implements OnInit {

  @Input() tipIcon: TipIcon;

  constructor() {
    this.tipIcon = 'info';
  }

  ngOnInit(): void {
  }

}
