import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Profile } from '../../../shared/types/profile.model';

export interface ProfilesState extends EntityState<Profile> {
  selectedProfile: Profile | null;
  totalCount: number;
}

export function createInitialProfilesState(): ProfilesState {
  return {
    selectedProfile: null,
    totalCount: 0
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'profiles', idKey: '_id' })
export class ProfilesStore extends EntityStore<ProfilesState> {

  constructor() {
    super(createInitialProfilesState());
  }

}
