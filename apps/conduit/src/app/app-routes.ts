import { Routes, RouterModule } from '@angular/router';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';
import { routes as EditorRoutes } from './editor';
import { routes as ArticleRoutes } from './article';
import { routes as ProfileRoutes } from './profile';
import { routes as SettingsRoutes } from './settings';


export const routes: Routes = [
  {
    path: 'settings',
    ...SettingsRoutes
  },
  {
    path: 'profile',
    ...ProfileRoutes
  },
  {
    path: 'editor',
    ...EditorRoutes
  },
  {
    path: 'article',
    ...ArticleRoutes
  }
];
