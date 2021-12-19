import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pm-autofocus-test',
  template: `
    <input type="text" app-pm-autofocus>
  `,
  styles: [
  ]
})
// this component is not declared in any modules because it's a test component and it won't be used anywhere else except in the specs.
export class PmAutofocusTestComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
