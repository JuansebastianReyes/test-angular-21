import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  imports: [],
  templateUrl: './posts.html',
  styleUrl: './posts.css',
})
export default class Posts {

  private router = inject(Router);

  lastNavigation = computed(() => this.router.lastSuccessfulNavigation);

  redirecToUser() {
    this.router.navigate(['/dashboard/users']);
  }

  back(){
    console.log(this.lastNavigation());
  }
}
