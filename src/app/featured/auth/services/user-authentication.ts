import { computed, inject, Injectable, signal } from '@angular/core';
import { UserDecode } from '../model/userDecode';
import { decodeUserTokenAdapter } from '../adapters/authAdapter';
import { decodeUserToken } from '../utilities/decodeToken';
import { SsrCookieService } from '@app/shared/services/ssrCookieService';

@Injectable({
  providedIn: 'root',
})
export class UserAuthentication {
  private ssrCookieService = inject(SsrCookieService);

  // Usar cookies que funcionan tanto en SSR como en el browser
  private tokenSignal = signal<string>(this.ssrCookieService.getCookie('tokenAccessLvJersey'));
  private refreshTokenSignal = signal<string>(
    this.ssrCookieService.getCookie('refreshTokenAccessLvJersey')
  );

  private userSignal = computed<UserDecode>(() => {
    const token = this.tokenSignal();
    if (token) return decodeUserTokenAdapter(decodeUserToken(token));
    return {} as UserDecode;
  });

  private isLoggedInSignal = computed<boolean>(() => !!this.tokenSignal());
  private isAdminSignal = computed<boolean>(() => this.userSignal()?.role === 'ADMIN');

  setTokenSignal = (token: string) => this.tokenSignal.set(token);
  setRefreshTokenSignal = (refreshToken: string) => this.refreshTokenSignal.set(refreshToken);

  setLocalStorageTokens = (accessToken: string, refreshToken: string) => {
    // Guardar en cookies
    this.ssrCookieService.setCookie('tokenAccessLvJersey', accessToken);
    this.ssrCookieService.setCookie('refreshTokenAccessLvJersey', refreshToken);
    // Actualizar los signals
    this.tokenSignal.set(accessToken);
    this.refreshTokenSignal.set(refreshToken);
  };

  clearTokens = () => {
    this.tokenSignal.set('');
    this.refreshTokenSignal.set('');
    this.ssrCookieService.removeCookie('tokenAccessLvJersey');
    this.ssrCookieService.removeCookie('refreshTokenAccessLvJersey');
  };

  getUserSignal = () => this.userSignal();
  getTokenSignal = () => this.tokenSignal();
  getRefreshTokenSignal = () => this.refreshTokenSignal();
  getIsLoggedInSignal = () => this.isLoggedInSignal();
  getIsAdminSignal = () => this.isAdminSignal();
}
