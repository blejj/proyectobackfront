// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

// ✔ Registrar datos de español ANTES de bootstrap
registerLocaleData(localeEs, 'es');

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
