import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { AppInfo } from '../shared/types/app.model';
import { Profile } from '../shared/types/profile.model';

export interface AppState {
  appInfo: AppInfo | null;
  userProfile: Profile | null;
  userHasProfile: boolean | null;
}

export function createInitialAppState(): AppState {
  return {
    appInfo: null,
    userProfile: null,
    userHasProfile: null
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'app' })
export class AppStore extends Store<AppState> {

  constructor() {
    super(createInitialAppState());
  }

}
