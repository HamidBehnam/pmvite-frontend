import { Injectable } from '@angular/core';
import { Profile } from '../types/profile.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfilesHelpersService {

  constructor() { }

  getProfileImage(profile: Profile): string {
    if (profile.image) {
      return `${environment.apiUrl}/profiles/${profile._id}/images/${profile.image._id}`;
    } else {
      return profile.originalImageLink;
    }
  }
}
