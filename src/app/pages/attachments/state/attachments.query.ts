import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { AttachmentsStore, AttachmentsState } from './attachments.store';

@Injectable({ providedIn: 'root' })
export class AttachmentsQuery extends QueryEntity<AttachmentsState> {

  selectSelectedAttachment$ = this.select('selectedAttachment');

  constructor(protected override store: AttachmentsStore) {
    super(store);
  }

}
