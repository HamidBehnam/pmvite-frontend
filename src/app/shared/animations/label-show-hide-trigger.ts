import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

// TODO: Valid animation for the cases where there's no ngIf and animation can be controlled using a flag (condition):
//  for instance: <div [@labelShowHide]="condition ? 'show' : 'hide'">...</div>
// export const labelShowHideTrigger: AnimationTriggerMetadata = trigger('labelShowHide', [
//   state('show', style({width: '80px', opacity: 1})),
//   state('hide', style({width: '0', opacity: 0})),
//   transition('show <=> hide', animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
// ]);

export const labelShowHideTrigger: AnimationTriggerMetadata = trigger('labelShowHide', [
  transition(':enter', [
    style({ width: '0', opacity: 0 }),
    animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({ width: '80px', opacity: 1 }))
  ]),
  transition(':leave', [
    style({ width: '80px', opacity: 1 }),
    animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({ width: '0', opacity: 0 }))
  ])
]);
