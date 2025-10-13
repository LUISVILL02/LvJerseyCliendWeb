import { Component, computed, inject, signal } from '@angular/core';
import { LoginApi } from '../../services/login-api';
import { FormLogin } from "../../components/form-login/form-login";
import { LOGIN_WITH_SOCIAL } from '../../injection-tokens';

@Component({
  selector: 'app-login',
  imports: [FormLogin],
  templateUrl: './login.html',
})
export class Login {
  
  private authService = inject(LoginApi);
  private socialAuthService = inject(LOGIN_WITH_SOCIAL);

  dataWithCredentials = signal<{username: string; password: string} | null>(null);

  loading = computed(() => this.authService.loading());
  loadingSocial = computed(() => this.socialAuthService.loading());
  errorResponse = computed(() => this.authService.errorResponse().error ? 
                                this.authService.errorResponse() : 
                                this.socialAuthService.errorResponse());

  handleSocialAuth() {
    this.socialAuthService.loginSocial();
  }

  handleAuthData($event: { username: string; password: string; }) {
    this.dataWithCredentials.set($event);
    this.authService.loginWithCredentials($event.username, $event.password);
  }
}
