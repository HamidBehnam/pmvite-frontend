import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private isLoading$$ = new BehaviorSubject<boolean>(false);
  // since the private subject is being converted to observable it won't be triggered from any outside resources.
  isLoading$ = this.isLoading$$.asObservable();

  constructor() { }

  setLoading(isLoading: boolean): void {
    this.isLoading$$.next(isLoading);
  }
}
