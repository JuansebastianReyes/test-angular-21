import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UserList } from '../models/users.models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpClient = inject(HttpClient);

  getUsers(limit: number, skip: number) {
    const select = 'id,firstName,lastName,email,age,phone';
    return firstValueFrom(
      this.httpClient.get<UserList>(`/api/users?limit=${limit}&skip=${skip}&select=${select}`)
    );
  }
}
