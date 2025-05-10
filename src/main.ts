import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import 'hammerjs';

import { environment } from './environments/environment';
import {
  provideHttpClient,
  withInterceptorsFromDi
} from '@angular/common/http';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatRippleModule, MatCommonModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      AppRoutingModule,
      BrowserModule,
      FormsModule,
      MatRippleModule,
      MatCommonModule,
      MatIconModule,
      MatSlideToggleModule,
      MatToolbarModule,
      MatButtonModule,
      MatBadgeModule
    ),
    provideHttpClient(withInterceptorsFromDi())
  ]
}).catch((err) => console.error(err));
