import { animate, AnimationTriggerMetadata, keyframes, state, style, transition, trigger } from '@angular/animations';

// TODO: textChangeTrigger and routeShowHideTrigger are identical
export const textChangeTrigger: AnimationTriggerMetadata = trigger('textChange', [
  transition('void => *', []),   // when the item is created
  transition('* => void', []),   // when the item is removed
  transition('* => *', [         // when the item is changed
    animate('400ms', keyframes([
      style ({ opacity: 0, offset: 0.0 }),
      style ({ opacity: 1, offset: 1.0 }),
    ])),
  ]),
]);
