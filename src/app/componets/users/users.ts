import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user';
import { UserList } from '../../models/users.models';
import { UserDialog } from '../user-dialog/user-dialog';

@Component({
  selector: 'app-users',
  imports: [UserDialog],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export default class Users {
  private userService = inject(UserService);

  resApi = signal<UserList>({} as UserList);
  titles = signal<string[]>(['Name', 'Email', 'Age','Phone', 'Detail']);
  page = signal(1);
  limit = signal(10)
  modal = signal(false);

  skip = computed(() => (this.page() - 1) * this.limit());
  totalRows = computed(() => this.resApi().total ?? 0);
  totalPages = computed(() => Math.max(1, Math.ceil(this.totalRows() / this.limit())));
  pagesArray = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));

  constructor() {
    this.getUsers(this.limit(), this.skip());
  }

  async getUsers(limit: number, skip: number) {
    const users = await this.userService.getUsers(limit, skip);
    this.resApi.set(users);
  }

  prev() {
    if (this.page() > 1) {
      const p = this.page() - 1;
      this.page.set(p);
      this.getUsers(this.limit(), (p - 1) * this.limit());
    }
  }

  next() {
    if (this.page() < this.totalPages()) {
      const p = this.page() + 1;
      this.page.set(p);
      this.getUsers(this.limit(), (p - 1) * this.limit());
    }
  }

  goTo(p: number) {
    if (p >= 1 && p <= this.totalPages()) {
      this.page.set(p);
      this.getUsers(this.limit(), (p - 1) * this.limit());
    }
  }

  openModal() {
    this.modal.set(!this.modal());
  }
}

