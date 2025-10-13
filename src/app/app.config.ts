import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { responseTransformInterceptor } from '@src/interceptors/responseTransformInterceptor';
import { CORE_PROVIDERS } from './shared/services/service-registry';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), 
    provideHttpClient(
      withFetch(),
      withInterceptors([
        responseTransformInterceptor
      ])
    ),
    provideClientHydration(
      withEventReplay()
    ),
    ...CORE_PROVIDERS
  ]
};
