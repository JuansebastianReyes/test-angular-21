import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  const isBrowser = isPlatformBrowser(platformId);
  if (!isBrowser) {
    return true;
  }
  const token = localStorage.getItem('auth.token');
  const expiresAt = Number(localStorage.getItem('auth.expiresAt') || '0');
  const valid = !!token && expiresAt > Date.now();
  return valid ? true : router.createUrlTree(['/auth']);
};
