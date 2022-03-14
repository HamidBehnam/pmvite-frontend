import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from '../../../shared/types/profile.model';
import { ProfilesService } from '../state/profiles.service';
import { ProfilesQuery } from '../state/profiles.query';
import { AuthService } from '@auth0/auth0-angular';
import { AppQuery } from '../../../state/app.query';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-creation-broker',
  templateUrl: './profile-creation-broker.component.html',
  styleUrls: ['./profile-creation-broker.component.scss']
})
export class ProfileCreationBrokerComponent implements OnInit {

  constructor(
    private router: Router,
    private profilesService: ProfilesService,
    private profilesQuery: ProfilesQuery,
    public authService: AuthService,
    public appQuery: AppQuery,
    private matSnackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.appQuery.selectUserProfile$.subscribe(profile => {
      if (profile) {
        this.router.navigate(['profiles', profile._id]);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['profiles']);
  }

  save(payload: Partial<Profile>): void {
    this.profilesService.createProfile(payload).subscribe(_ => {
      this.router.navigate(['profiles', this.profilesQuery.getValue().selectedProfile?._id]);
      this.matSnackBar.open('Profile was successfully created!', 'OK', {duration: 5000});
    });
  }
}
