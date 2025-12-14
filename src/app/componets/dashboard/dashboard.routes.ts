import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard'),
    children: [
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full',
      },
      {
        path: 'users',
        loadComponent: () => import('../users/users'),
        title: 'users',
      },
      {
        path: 'posts',
        loadComponent: () => import('../posts/posts'),
        title: 'posts',
      },
      {
        path: '**',
        redirectTo: 'users',
      },
    ],
  },
];

export default routes;
