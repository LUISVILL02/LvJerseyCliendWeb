import { Component, computed, inject, signal } from '@angular/core';
import { FormRegister } from "../../components/form-register/form-register";
import { LOGIN_WITH_SOCIAL } from '../../injection-tokens';
import { RegisterApi } from '../../services/register-api';
import { RegisterBody } from '../../model/register';

@Component({
  selector: 'app-register',
  imports: [FormRegister],
  templateUrl: './register.html',
})
export class Register {

  private authService = inject(RegisterApi);
  private socialAuthService = inject(LOGIN_WITH_SOCIAL);

  dataWithCredentials = signal<RegisterBody | null>(null);

  loading = computed(() => this.authService.loading());
  loadingSocial = computed(() => this.socialAuthService.loading());
  errorResponse = computed(() => this.authService.errorResponse().error ? 
                                this.authService.errorResponse() : 
                                this.socialAuthService.errorResponse());


  handleSocialAuth() {
    this.socialAuthService.loginSocial();
  }

  handleAuthData($event: RegisterBody) {
    this.dataWithCredentials.set($event);
    const data: RegisterBody = {
      nickName: $event.nickName,
      email: $event.email,
      password: $event.password
    }
    this.authService.registerWithCredentials(data);
  }
}
