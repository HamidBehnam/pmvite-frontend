import { TestBed } from '@angular/core/testing';

import { ServerInteractionInterceptor } from './server-interaction.interceptor';

describe('ServerInteractionInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ServerInteractionInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ServerInteractionInterceptor = TestBed.inject(ServerInteractionInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
