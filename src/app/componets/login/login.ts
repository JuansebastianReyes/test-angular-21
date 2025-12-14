
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Field, form, maxLength, minLength, required, submit } from '@angular/forms/signals';
import { LoginService } from '../../service/login';
import { Router } from '@angular/router';
import { loginBody, loginResponse } from '../../models/login.model';

@Component({
  selector: 'app-login',
  imports: [Field],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Login {
  private loginService = inject(LoginService);
  private router = inject(Router);


  loginSignal = signal<loginBody>({
    username:'',
    password: ''
  });

  showPassword = signal(false);

  loginForm = form(this.loginSignal, (param) => {
    required(param.username, {message: 'Username is required'});
    required(param.password, {message: 'Password is required'});
    minLength(param.password, 6, {message: 'Password must be at least 6 characters long'});
    maxLength(param.password, 12, {message: 'Password must be at most 64 characters long'});
  });

  async onSubmit(event: Event) {
    event.preventDefault();

    await submit(this.loginForm, async (form)=> {
      try {
        const data: loginResponse = await this.loginService.login(form().value());
        if (this.loginService.setSession(data)) {
          this.router.navigate(['/dashboard']);
        }
      } catch (err) {
        console.error(err);
      }
    });
  }

}
