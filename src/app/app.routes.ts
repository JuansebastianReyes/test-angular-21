import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadComponent: () => import('./componets/login/login'),
    title: 'Login',
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./componets/dashboard/dashboard.routes'),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: '/auth',
  }

];
