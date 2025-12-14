import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { loginResponse } from '../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private httpClient = inject(HttpClient);

  login(param: {username: string, password: string}) {
    return firstValueFrom(
      this.httpClient.post<loginResponse>('/api/auth/login', param, { withCredentials: true })
    );
  }

  setSession(data: loginResponse): boolean {
    if (typeof window === 'undefined') return false;
    const token = (data as any)?.accessToken ?? (data as any)?.token;
    if (!token) return false;
    const minutes = typeof (data as any)?.expiresInMins === 'number' ? (data as any).expiresInMins : 30;
    const expiresAt = Date.now() + minutes * 60 * 1000;
    localStorage.setItem('auth.token', token);
    localStorage.setItem('auth.expiresAt', String(expiresAt));
    return true;
  }

}
