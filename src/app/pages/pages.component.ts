import { AfterContentChecked, ChangeDetectorRef, Component, HostBinding, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { AppService } from '../state/app.service';
import { UiService } from '../shared/services/ui.service';
import { combineLatest, of } from 'rxjs';
import { routeShowHideTrigger } from '../shared/animations/route-show-hide-trigger';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TermsAndConditionsDialogComponent } from '../shared/components/terms-and-conditions-dialog/terms-and-conditions-dialog.component';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  animations: [
    routeShowHideTrigger
  ]
})
export class PagesComponent implements OnInit, AfterContentChecked {

  @HostBinding('class.has-sticky-footer') hasStickyFooter?: boolean;
  @HostBinding('class.has-partial-navbar') hasPartialNavbar?: boolean;
  @HostBinding('class.landing-page-ui-activated') landingPageUiActivated?: boolean;

  constructor(
    private authService: AuthService,
    private appService: AppService,
    private uiService: UiService,
    private changeDetectorRef: ChangeDetectorRef,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.appService.getAppInfo().subscribe();
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.appService.getUserProfile().subscribe();
      }

      combineLatest([
        of(isAuthenticated),
        this.uiService.secondaryNavIsVisible,
        this.uiService.isMobile,
      ]).subscribe(([
                           authenticated,
                           secondaryNavbarIsVisible,
                           isMobile
                         ]) => this.hasPartialNavbar = !authenticated || (!secondaryNavbarIsVisible && isMobile));
    });

    this.uiService.landingPageUiActivated.subscribe(activated => {
      this.landingPageUiActivated = activated;
    });

    this.hasStickyFooter = this.uiService.pageHasStickyFooter;

    this.showTermsAndConditionsIfNotAccepted();
  }

  ngAfterContentChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  prepareRoute(outlet: RouterOutlet): ActivatedRoute | null {
    return outlet.isActivated ? outlet.activatedRoute : null;
  }

  showTermsAndConditions(): void {
    const dialogRef = this.matDialog.open(TermsAndConditionsDialogComponent, {
      disableClose: true,
      panelClass: 'terms-and-conditions-dialog-panel'
    });

    dialogRef.afterClosed().subscribe(choice => {
      if (choice) {
        localStorage.setItem('termsAndConditionsAccepted', 'true');
      }
    });
  }

  showTermsAndConditionsIfNotAccepted(): void {
    if (!localStorage.getItem('termsAndConditionsAccepted')) {
      this.showTermsAndConditions();
    }
  }
}
