import { Component, inject, input, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons';
import { commonRoutes } from '@src/app/app.routes';
import { ButtonGeneric } from '@src/app/shared/components/button-generic/button-generic';
import { ButtonSocial } from '@src/app/shared/components/button-social/button-social';
import { InputWithIcon } from '@src/app/shared/components/input-with-icon/input-with-icon';
import { Input } from '@src/app/shared/components/input/input';
import { RegisterBody } from '../../model/register';

@Component({
  selector: 'app-form-register',
  imports: [Input, InputWithIcon, ButtonGeneric, ButtonSocial, ReactiveFormsModule, RouterLink],
  templateUrl: './form-register.html',
})
export class FormRegister {
  faLock = faLock;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  commonRoutes = commonRoutes;

  authClick = output<void>();
  dataWithCredentials = output<RegisterBody>();

  loading = input(false);
  errorResponse = input<{error: boolean; message: string | null}>({ error: false, message: null });
  
  isSubmited = signal(false);

  private fb = inject(FormBuilder);

  loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      nickName: ['', [Validators.required, Validators.minLength(3)]],
  });

  isInvalid(controlName: string): {inValid: boolean, error: string | null} {
    const control = this.loginForm.get(controlName);
    const value = { 
      inValid: !!(control && control.invalid && (control.touched || this.isSubmited())), 
      error: control?.errors ? Object.keys(control.errors)[0] : null
    };
    return value;
  }

  getErrorMessage(controlName: string, inputName: string): string {
    const control = this.loginForm.get(controlName);

    if (!control?.errors) return '';
    if (control.errors['required']) return `${inputName} obligatorio`;
    if (control.errors['email']) return 'Introduce un correo electrónico válido';
    if (control.errors['minlength']) {
        const requiredLength = control.errors['minlength'].requiredLength;
        return `La contraseña debe tener al menos ${requiredLength} caracteres`;
    }
    return 'Error desconocido';
  }

  sendData = () => {
    this.isSubmited.set(true);
    if (this.loginForm.valid) {
        this.dataWithCredentials.emit(this.loginForm.value as RegisterBody);
        return;
    }

  }
}
