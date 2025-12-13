import { Routes } from '@angular/router';

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
    loadComponent: () => import('./componets/dashboard/dashboard'),
    title: 'Dashboard',
  },
  {
    path: '**',
    redirectTo: '/auth',
  }

];
