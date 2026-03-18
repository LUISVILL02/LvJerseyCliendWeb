import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { UserDecode } from '../model/userDecode';
import { decodeUserTokenAdapter } from '../adapters/authAdapter';
import { decodeUserToken } from '../utilities/decodeToken';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserAuthentication {

  private platformId = inject(PLATFORM_ID);

  private userSignal = computed<UserDecode>(() => {
    const token = this.tokenSignal();
    if (token) return decodeUserTokenAdapter(decodeUserToken(token));
    return {} as UserDecode;
  });
  private tokenSignal = signal<string>(isPlatformBrowser(this.platformId) ? localStorage.getItem('tokenAccessLvJersey') || '' : '');
  private refreshTokeSignal = signal<string>(isPlatformBrowser(this.platformId) ? localStorage.getItem('refreshTokenAccessLvJersey') || '' : '');

  private isLoggedInSignal = computed<boolean>(() => !!this.tokenSignal());
  private isAdminSignal = computed<boolean>(() => this.userSignal()?.rol === 'ADMIN');


  setTokenSignal = (token: string) => this.tokenSignal.set(token)
  setRefreshTokeSignal = (refreshToken: string) => this.refreshTokeSignal.set(refreshToken)

  setLocalStorageTokens = (accessToken: string, refreshToken: string) => {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('tokenAccessLvJersey', accessToken);
      localStorage.setItem('refreshTokenAccessLvJersey', refreshToken);
    }
  }

  clearTokens = () => {
    this.tokenSignal.set('');
    this.refreshTokeSignal.set('');
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('tokenAccessLvJersey');
      localStorage.removeItem('refreshTokenAccessLvJersey');
    }
  }

  getUserSignal = () => this.userSignal();
  getTokenSignal = () => this.tokenSignal();
  getRefreshTokeSignal = () => this.refreshTokeSignal();
  getIsLoggedInSignal = () => this.isLoggedInSignal();
  getIsAdminSignal = () => this.isAdminSignal();
}
