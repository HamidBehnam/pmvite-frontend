import { Component, Input, OnInit } from '@angular/core';
import { textChangeTrigger } from '../../animations/text-change-trigger';

@Component({
  selector: 'app-content-copier',
  templateUrl: './content-copier.component.html',
  styleUrls: ['./content-copier.component.scss'],
  animations: [
    textChangeTrigger
  ]
})
export class ContentCopierComponent implements OnInit {

  @Input() content: string;
  @Input() label: string;
  copiedLabel: string;
  currentLabel!: string;

  constructor() {
    this.content = '';
    this.label = 'Copy';
    this.copiedLabel = 'Copied!';
  }

  ngOnInit(): void {
    this.currentLabel = this.label;
  }

  updateCurrentLabel(): void {
    this.currentLabel = this.copiedLabel;
    setTimeout(() => this.currentLabel = this.label, 2000);
  }
}
