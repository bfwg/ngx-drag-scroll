import 'hammerjs';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { MatCommonModule, MatRippleModule } from '@angular/material/core';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import {
  provideHttpClient,
  withInterceptorsFromDi
} from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { environment } from './environments/environment';

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
