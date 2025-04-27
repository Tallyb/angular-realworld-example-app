import { enableProdMode, importProvidersFrom, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { environment } from './environments/environment';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

if (environment.production) {
  enableProdMode();
}

const bootstrapPromise = bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    ),
    provideHttpClient(),
    provideRouter(routes),
    provideExperimentalZonelessChangeDetection()
  ]
});

// Logging bootstrap information
bootstrapPromise.then(success => console.log(`Bootstrap success`))
  .catch(err => console.error(err));
