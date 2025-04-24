import { Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { AuthGuard } from '../core';

export const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    canActivate: [AuthGuard]
  }
];