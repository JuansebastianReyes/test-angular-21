import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { loginResponse } from '../models/models';

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


}
