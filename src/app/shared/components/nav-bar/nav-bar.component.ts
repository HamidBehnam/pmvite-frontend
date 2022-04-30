import { Component, Inject, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { AppQuery } from '../../../state/app.query';
import { ProfilesHelpersService } from '../../services/profiles-helpers.service';
import { Profile } from '../../types/profile.model';
import { LoadingService } from '../../services/loading.service';
import { PanelQueryParam } from '../../types/panel-query-param.enum';
import { filter } from 'rxjs/operators';
import { UiService } from '../../services/ui.service';
import { MatDialog } from '@angular/material/dialog';
import { HelpDialogComponent } from '../help-dialog/help-dialog.component';
import { AboutDialogComponent } from '../about-dialog/about-dialog.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  profileImageLoaded = false;

  constructor(
    private router: Router,
    public authService: AuthService,
    @Inject(DOCUMENT) private doc: Document,
    public appQuery: AppQuery,
    public profilesHelpersService: ProfilesHelpersService,
    public loadingService: LoadingService,
    public uiService: UiService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationStart)
      ).subscribe(_ => this.uiService.hideSecondaryNav());
  }

  login(): void {
    this.authService.loginWithRedirect({
      appState: { target: '/projects' }
    });
  }

  signup(): void {
    this.authService.loginWithRedirect({
      screen_hint: 'signup',
      appState: { target: '/projects' }
    });
  }

  logout(): void {
    const currentUrl = this.doc.location.href;
    const currentRouteWithoutSlash = this.router.url.slice(1);
    const returnTo = currentUrl.slice(0, currentUrl.lastIndexOf(currentRouteWithoutSlash));
    this.authService.logout({
      returnTo
    });
  }

  setProfileImageLoadStatus(): void {
    this.profileImageLoaded = true;
  }

  goToMyProfilePage(profile: Profile): void {
    this.router.navigate(['profiles', profile._id]);
  }

  goToMyProjectsPage(profile: Profile): void {
    this.router.navigate(['profiles', profile._id], {
      queryParams: {
        section: 1
      }
    });
  }

  goToMyTasksPage(profile: Profile): void {
    this.router.navigate(['profiles', profile._id], {
      queryParams: {
        section: 2
      }
    });
  }

  goToMyProjectsPageCreationPanel(profile: Profile): void {
    this.router.navigate(['profiles', profile._id], {
      queryParams: {
        section: 1,
        [PanelQueryParam.ProjectCreationPanel]: 'open'
      }
    });
  }

  goToMyProfileSettings(profile: Profile): void {
    this.router.navigate(['profiles', profile._id], {
      queryParams: {
        section: 3
      }
    });
  }

  goToProfileCreationPage(): void {
    this.router.navigate(['profiles', 'create']);
  }

  showHelpDialog(): void {
    const dialogRef = this.matDialog.open(HelpDialogComponent, {
      disableClose: true,
      panelClass: 'help-dialog-panel'
    });

    dialogRef.afterClosed().subscribe(choice => {
      if (choice) {
        // help dialog was closed by clicking the 'close' button
      }
    });
  }

  showAboutDialog(): void {
    const dialogRef = this.matDialog.open(AboutDialogComponent, {
      disableClose: true,
      panelClass: 'about-dialog-panel'
    });

    dialogRef.afterClosed().subscribe(choice => {
      if (choice) {
        // about dialog was closed by clicking the 'close' button
      }
    });
  }
}
