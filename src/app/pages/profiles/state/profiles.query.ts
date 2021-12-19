import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ProfilesStore, ProfilesState } from './profiles.store';

@Injectable({ providedIn: 'root' })
export class ProfilesQuery extends QueryEntity<ProfilesState> {

  selectSelectedProfile$ = this.select('selectedProfile');
  selectTotalCount$ = this.select('totalCount');

  constructor(protected override store: ProfilesStore) {
    super(store);
  }

}
