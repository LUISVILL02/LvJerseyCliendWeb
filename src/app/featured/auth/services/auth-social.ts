import { HttpClient } from '@angular/common/http';
import { DestroyRef, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@src/environments/environment';
import { catchError } from 'rxjs/operators';
import { GoogleOAuthError, GoogleCompleteAuthResponse, UserInfoBackend } from '../model/socialModels';
import { GoogleOAuth2Config } from '../model/socialSdk';
import { LoginWithSocial } from './LogingWithSocial';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ResponseAuth } from '../model/responseAuth';
import { UserAuthentication } from './user-authentication';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthSocial implements LoginWithSocial {

  private url = environment.apiUrl;
  private googleClientId = environment.googleClientId;
  private httpClient = inject(HttpClient);
  private userAuth = inject(UserAuthentication);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  readonly isGoogleReady = signal(false);

  private idToken = signal<string>('');

  loading = signal<boolean>(false);
  errorResponse = signal<{ error: boolean; message: string; }>({ error: false, message: '' });

  constructor() {
    const interval = setInterval(() => {
      if (window.google?.accounts?.id) {
        this.isGoogleReady.set(true);
        clearInterval(interval);
      }
    }, 200);

    effect(() => {
      if (this.idToken() !== '') {
        this.loginSocialBakend({ tokenId: this.idToken(), provider: 'Google' } );
      }
    })
  }

  google = window.google; 
  
  loginSocial(): void {
    if (!this.isGoogleReady()) {
      console.error('Google SDK not loaded');
      return;
    }

    try {
      this.google?.accounts.id.cancel();

      const config: GoogleOAuth2Config = {
        client_id: this.googleClientId,
        scope: 'email profile openid',
        ux_mode: 'popup', 
        callback: (response: { code: string }) => {
          this.exchangeCodeForTokens(response.code);
        },
        error_callback: (error: GoogleOAuthError) => {
          throw error;
        }
      };

      const client = this.google?.accounts.oauth2.initCodeClient(config);

      if (client) {
        client.requestCode();
      }

    } catch (error) {
      throw error;
    }
  }

  private exchangeCodeForTokens(code: string): void  {
    const tokenRequest = {
      client_id: this.googleClientId,
      client_secret: environment.googleClientSecret,
      code: code,
      grant_type: 'authorization_code',
      redirect_uri: window.location.origin
    };

    this.httpClient.post<GoogleCompleteAuthResponse>('https://oauth2.googleapis.com/token', tokenRequest)
    .pipe(
      takeUntilDestroyed(this.destroyRef),
      catchError((error) => {
        throw error;
      })
    ).subscribe(response => {
      this.idToken.set(response.id_token);
    });
  }

  loginSocialBakend(userInfo: UserInfoBackend): void {
    this.loading.set(true);
    this.httpClient.post<ResponseAuth>(`${this.url}/Auth/auth-social`, userInfo)
    .pipe(
      takeUntilDestroyed(this.destroyRef),
      catchError((error) => {
        this.loading.set(false);
        this.errorResponse.set({ error: true, message: error.error?.message || 'Ha ocurrido un error al iniciar sesión' });
        setTimeout(() => this.errorResponse.set({ error: false, message: '' }), 3000);
        throw error;
      })
    ).subscribe(response => {
      this.loading.set(false);
      this.errorResponse.set({ error: false, message: '' });
      this.userAuth.setTokenSignal(response.accessToken);
      this.userAuth.setRefreshTokeSignal(response.refreshToken);
      this.userAuth.setLocalStorageTokens(response.accessToken, response.refreshToken);
      this.router.navigate(['/']);
    });
  }

}
