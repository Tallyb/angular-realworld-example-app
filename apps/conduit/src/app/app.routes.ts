import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/auth.component').then(m => m.AuthComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/auth.component').then(m => m.AuthComponent)
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings.component').then(m => m.SettingsComponent)
  },
  {
    path: 'editor',
    loadComponent: () => import('./editor/editor.component').then(m => m.EditorComponent)
  },
  {
    path: 'article/:slug',
    loadComponent: () => import('./article/article.component').then(m => m.ArticleComponent)
  },
  {
    path: 'profile/:username',
    loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent)
  }
];