import { PmAutofocusDirective } from './pm-autofocus.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pm-autofocus-test',
  template: `
    <input type="text" app-pm-autofocus>
  `
})
class PmAutofocusTestComponent {}

describe('PmAutofocusDirective', () => {
  let component: PmAutofocusTestComponent;
  let fixture: ComponentFixture<PmAutofocusTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmAutofocusTestComponent, PmAutofocusDirective ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmAutofocusTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set the focus on the element that it\'s applied to', () => {
    const focusedElement: HTMLElement = fixture.nativeElement.querySelector('input:focus');
    expect(focusedElement).toBeTruthy();
  });

  // it('should create an instance', () => {
  //   const directive = new PmAutofocusDirective();
  //   expect(directive).toBeTruthy();
  // });
});
