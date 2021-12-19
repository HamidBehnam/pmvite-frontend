import { animate, AnimationTriggerMetadata, style, transition, trigger } from '@angular/animations';

// TODO: routeShowHideTrigger and textChangeTrigger are identical
export const routeShowHideTrigger: AnimationTriggerMetadata = trigger('routeShowHide', [

  transition('* => *', [

    // css styles at start of transition
    style({ opacity: 0 }),

    // animation and styles at end of transition
    animate('400ms', style({ opacity: 1 }))
  ]),
]);
