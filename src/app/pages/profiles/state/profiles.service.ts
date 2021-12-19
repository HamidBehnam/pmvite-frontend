import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { catchError, tap } from 'rxjs/operators';
import { Profile } from '../../../shared/types/profile.model';
import { ProfilesStore } from './profiles.store';
import { environment } from '../../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { ProfilesQuery } from './profiles.query';
import { AppStore } from '../../../state/app.store';
import { AppQuery } from '../../../state/app.query';
import { FileReference } from '../../../shared/types/file-reference.model';
import { ProfileAutocompleteRequest } from '../../../shared/types/profile-autocomplete-request.model';
import { ProfilesGETRequestMeta } from '../../../shared/types/profiles-get-meta.type';
import { RequestMetaFormat } from '../../../shared/types/request-meta-format.type';
import { ListResponse } from '../../../shared/types/list-response';

@Injectable({ providedIn: 'root' })
export class ProfilesService {

  constructor(private http: HttpClient,
              private profilesStore: ProfilesStore,
              private profilesQuery: ProfilesQuery,
              private appStore: AppStore,
              private appQuery: AppQuery
  ) {
  }

  private static profilesGETParamsExtractor(profilesGETRequestMeta: Partial<ProfilesGETRequestMeta>): RequestMetaFormat {
    return {
      ...profilesGETRequestMeta.sort && {sort: profilesGETRequestMeta.sort},
      ...profilesGETRequestMeta.limit && {limit: profilesGETRequestMeta.limit},
      ...profilesGETRequestMeta.page && {page: profilesGETRequestMeta.page},
      ...profilesGETRequestMeta.term && {term: profilesGETRequestMeta.term},
      ...profilesGETRequestMeta.stat && {'stat[]': profilesGETRequestMeta.stat}
    };
  }

  private static profilesGETHeadersExtractor(profilesGETRequestMeta: Partial<ProfilesGETRequestMeta>): RequestMetaFormat {
    return {
      ...profilesGETRequestMeta.projectId && {projectId: profilesGETRequestMeta.projectId}
    };
  }

  getProfiles(profilesGETRequestMeta?: Partial<ProfilesGETRequestMeta>): Observable<ListResponse<Profile>> {

    let params: RequestMetaFormat = {};

    if (profilesGETRequestMeta) {
      params = ProfilesService.profilesGETParamsExtractor(profilesGETRequestMeta);
    }

    return this.http.get<ListResponse<Profile>>(`${environment.apiUrl}/profiles`, {
      params
    })
      .pipe(
        tap(response => {
          this.profilesStore.set(response.data);
          this.profilesStore.update({
            totalCount: response.total
          });
        })
      );
  }

  getProfilesAutocomplete(profilesGETRequestMeta?: Partial<ProfilesGETRequestMeta>): Observable<Profile[]> {

    let params: RequestMetaFormat = {};
    let headers: RequestMetaFormat = {};

    if (profilesGETRequestMeta) {
      params = ProfilesService.profilesGETParamsExtractor(profilesGETRequestMeta);
      headers = ProfilesService.profilesGETHeadersExtractor(profilesGETRequestMeta);
    }

    return this.http.get<Profile[]>(`${environment.apiUrl}/profiles-autocomplete`, {
      params,
      headers
    });
  }

  getProfile(profileId: string): Observable<Profile> {
    return this.http.get<Profile>(`${environment.apiUrl}/profiles/${profileId}`)
      .pipe(
        tap(profile => {
          this.profilesStore.update({
            selectedProfile: profile
          });

          if (profile && profile._id) {
            this.profilesStore.update(profile._id, profile);
          }
        })
      );
  }

  deleteProfile(profileId: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/profiles/${profileId}`)
      .pipe(
        tap(_ => {
          this.profilesStore.remove(profileId);
          this.appStore.update({
            userProfile: null,
            userHasProfile: false
          });
        })
      );
  }

  createProfile(payload: Partial<Profile>): Observable<Profile> {
    return this.http.post<Profile>(`${environment.apiUrl}/profiles`, payload)
      .pipe(
        tap(profile => {
          this.profilesStore.add(profile);
          this.profilesStore.update({
            selectedProfile: profile
          });
          this.appStore.update({
            userProfile: profile,
            userHasProfile: true
          });
        })
      );
  }

  updateProfile(profileId: string, payload: Partial<Profile>): Observable<Profile> {
    const backupProfile = this.profilesQuery.getValue().selectedProfile;
    this.updateProfileInStore(profileId, payload);

    return this.http.patch<Profile>(`${environment.apiUrl}/profiles/${profileId}`, payload)
      .pipe(
        catchError(error => {
          this.updateProfileInStore(profileId, backupProfile as Profile);
          return throwError(error);
        })
      );
  }

  updateProfileInStore(profileId: string, payload: Partial<Profile>): void {
    this.profilesStore.update(profileId, payload);
    this.profilesStore.update({
      selectedProfile: {
        ...(this.profilesQuery.getValue().selectedProfile as Profile),
        ...payload
      }
    });
  }

  uploadProfileImage(profileId: string, imageFile: File): Observable<any> {

    const fieldName = 'image';
    const formData = new FormData();
    formData.append(fieldName, imageFile);

    return this.http.post(`${environment.apiUrl}/profiles/${profileId}/images`, formData, {
      reportProgress: true,
      observe: 'events'
    })
      .pipe(
        tap(event => {
          if (event.type === HttpEventType.Response) {
            if (event.body) {
              this.profilesStore.update(profileId, {
                image: event.body as FileReference
              });

              this.profilesStore.update({
                selectedProfile: {
                  ...(this.profilesQuery.getValue().selectedProfile as Profile),
                  image: event.body as FileReference
                }
              });

              this.appStore.update({
                userProfile: {
                  ...(this.appQuery.getValue().userProfile as Profile),
                  image: event.body as FileReference
                }
              });
            }
          }
        })
      );
  }

  resetSelectedProfile(): void {
    this.profilesStore.update({
      selectedProfile: null
    });
  }
}
