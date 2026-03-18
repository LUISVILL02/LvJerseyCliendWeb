import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserAuthentication } from '@app/featured/auth/services/user-authentication';
import { UserProfile, UserAddress } from '../../models/user-profile';
import { ButtonGeneric } from '@app/shared/components/button-generic/button-generic';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, ButtonGeneric],
})
export class ProfilePage {
  private userAuth = inject(UserAuthentication);

  loading = signal(false);
  avatarPreview = signal<string | null>(null);

  // Datos del usuario desde el token
  user = this.userAuth.getUserSignal();

  // Datos del perfil (mock por ahora, luego vendrían del backend)
  profile = signal<UserProfile>({
    id: this.user?.idUser || 0,
    username: this.user?.nickname || '',
    fullName: '',
    email: this.user?.email || '',
    phone: '',
    avatarUrl: null,
    address: {
      country: '',
      state: '',
      city: '',
      postalCode: '',
      defaultAddress: '',
    },
  });

  // Campos editables
  fullName = signal(this.profile().fullName);
  address = signal<UserAddress>({ ...this.profile().address });

  // Máscara para datos sensibles
  maskedEmail(): string {
    const email = this.profile().email;
    if (!email) return '';
    const [user, domain] = email.split('@');
    if (user.length <= 2) return email;
    return `${user.substring(0, 2)}${'*'.repeat(Math.min(user.length - 2, 9))}@${domain}`;
  }

  maskedPhone(): string {
    const phone = this.profile().phone;
    if (!phone || phone.length < 2) return phone || '';
    return `${'*'.repeat(phone.length - 2)}${phone.slice(-2)}`;
  }

  onSelectImage(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.jpeg,.jpg,.png';
    input.onchange = (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        if (file.size > 1024 * 1024) {
          alert('El archivo excede el tamaño máximo de 1 MB');
          return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
          this.avatarPreview.set(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }

  onSave(): void {
    this.loading.set(true);
    // TODO: Implementar llamada al backend para guardar perfil
    setTimeout(() => {
      this.loading.set(false);
    }, 1000);
  }

  onChangeEmail(): void {
    // TODO: Navegar a página de cambio de email o abrir modal
    console.log('Cambiar email');
  }

  onChangePhone(): void {
    // TODO: Navegar a página de cambio de teléfono o abrir modal
    console.log('Cambiar teléfono');
  }

  onChangePassword(): void {
    // TODO: Navegar a página de cambio de contraseña
    console.log('Cambiar contraseña');
  }
}
