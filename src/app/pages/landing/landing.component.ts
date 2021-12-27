import { Component, OnDestroy, OnInit } from '@angular/core';
import { UiService } from '../../shared/services/ui.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {

  constructor(private uiService: UiService, private authService: AuthService) { }

  ngOnInit(): void {
    this.uiService.activateLandingPageUi();
  }

  ngOnDestroy(): void {
    this.uiService.deactivateLandingPageUi();
  }

  signup(): void {
    this.authService.loginWithRedirect({
      screen_hint: 'signup',
      appState: { target: '/projects' }
    });
  }
}
