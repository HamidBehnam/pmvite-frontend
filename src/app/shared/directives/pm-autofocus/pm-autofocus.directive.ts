import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[app-pm-autofocus], [appPmAutofocus]'
})
export class PmAutofocusDirective implements OnInit{

  element: HTMLElement;

  constructor(private elementRef: ElementRef) {
    this.element = this.elementRef.nativeElement;
  }

  ngOnInit(): void {
    if (!this.element.focus) {
      throw new Error('Element does not accept focus.');
    }

    // setTimeout is needed for the select elements.
    setTimeout(() => this.element.focus(), 0);

    // is needed for unit testing.
    this.element.focus();

    // TODO: Make autoselection optional based on an input value for the directive.
    // if (this.element instanceof HTMLInputElement) {
    //   element.select();
    // }
  }
}
