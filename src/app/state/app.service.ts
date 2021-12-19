import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, tap } from 'rxjs/operators';
import { AppStore } from './app.store';
import { Observable } from 'rxjs';
import { AppInfo } from '../shared/types/app.model';
import { Profile } from '../shared/types/profile.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AppService {

  constructor(private appStore: AppStore, private http: HttpClient) {
  }

  getAppInfo(): Observable<AppInfo> {
    return this.http.get<AppInfo>(`${environment.appInfoUrl}`)
      .pipe(
        tap(appInfo => this.appStore.update({
          appInfo
        }))
      );
  }

  getUserProfile(): Observable<Profile> {
    this.appStore.setLoading(true);
    return this.http.get<Profile>(`${environment.apiUrl}/user-profiles/me`)
      .pipe(
        tap(userProfiles => {
          const userProfile = Array.isArray(userProfiles) ? userProfiles.pop() : userProfiles;
          this.appStore.update({
            userProfile,
            userHasProfile: !!userProfile
          });
        }),
        finalize(() => this.appStore.setLoading(false))
      );
  }
}
