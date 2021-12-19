import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { MembersStore, MembersState } from './members.store';

@Injectable({ providedIn: 'root' })
export class MembersQuery extends QueryEntity<MembersState> {

  constructor(protected override store: MembersStore) {
    super(store);
  }

}
