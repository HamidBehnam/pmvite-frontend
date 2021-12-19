import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  private quillEditorMinHeightPrivate: string;
  private pageHasStickyFooterPrivate: boolean;
  private secondaryNavIsVisiblePrivate: BehaviorSubject<boolean>;
  private landingPageUiActivatedPrivate: BehaviorSubject<boolean>;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.quillEditorMinHeightPrivate = '223px';
    this.pageHasStickyFooterPrivate = false;
    this.secondaryNavIsVisiblePrivate = new BehaviorSubject<boolean>(false);
    this.landingPageUiActivatedPrivate = new BehaviorSubject<boolean>(false);
  }


  get quillEditorMinHeight(): string {
    return this.quillEditorMinHeightPrivate;
  }

  set quillEditorMinHeight(value: string) {
    this.quillEditorMinHeightPrivate = value;
  }

  get pageHasStickyFooter(): boolean {
    return this.pageHasStickyFooterPrivate;
  }

  set pageHasStickyFooter(value: boolean) {
    this.pageHasStickyFooterPrivate = value;
  }

  get isMobile(): Observable<boolean> {
    return this.breakpointObserver.observe(['(max-width: 767px)'])
      .pipe(
        map((breakpointState: BreakpointState) => breakpointState.matches)
      );
  }

  get secondaryNavIsVisible(): Observable<boolean> {
    return this.secondaryNavIsVisiblePrivate.asObservable();
  }

  get landingPageUiActivated(): Observable<boolean> {
    return this.landingPageUiActivatedPrivate.asObservable();
  }

  activateLandingPageUi(): void {
    this.landingPageUiActivatedPrivate.next(true);
  }

  deactivateLandingPageUi(): void {
    this.landingPageUiActivatedPrivate.next(false);
  }

  showSecondaryNav(): void {
    this.secondaryNavIsVisiblePrivate.next(true);
  }

  hideSecondaryNav(): void {
    this.secondaryNavIsVisiblePrivate.next(false);
  }

  toggleSecondaryNav(): void {
    this.secondaryNavIsVisiblePrivate.next(!this.secondaryNavIsVisiblePrivate.value);
  }
}
