import { Injectable } from '@angular/core';
import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { LoadingService } from '../loading.service';

@Injectable()
export class ServerInteractionInterceptor implements HttpInterceptor {

  private totalRequests = 0;

  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request)
      .pipe(
        tap((event: HttpEvent<unknown>) => {
          if (event.type === HttpEventType.Sent) {
            this.totalRequests++;
            this.loadingService.setLoading(true);
          }
        }),
        finalize(() => {
          this.totalRequests--;
          if (this.totalRequests === 0) {
            setTimeout(() => this.loadingService.setLoading(false), 1000);
          }
        })
      );
  }
}
