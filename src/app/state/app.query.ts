import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { AppStore, AppState } from './app.store';

@Injectable({ providedIn: 'root' })
export class AppQuery extends Query<AppState> {

  selectAppInfo$ = this.select('appInfo');
  selectUserProfile$ = this.select('userProfile');
  selectUserHasProfile$ = this.select('userHasProfile');

  constructor(protected store: AppStore) {
    super(store);
  }

}
