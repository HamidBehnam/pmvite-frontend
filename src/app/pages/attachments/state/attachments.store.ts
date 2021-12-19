import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { FileReference } from '../../../shared/types/file-reference.model';

export interface AttachmentsState extends EntityState<FileReference> {
  selectedAttachment: FileReference | null;
}

export function createInitialAttachmentsState(): AttachmentsState {
  return {
    selectedAttachment: null
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'attachments', idKey: '_id' })
export class AttachmentsStore extends EntityStore<AttachmentsState> {

  constructor() {
    super(createInitialAttachmentsState());
  }

}
