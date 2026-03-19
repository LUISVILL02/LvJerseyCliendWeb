import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { environment } from '@src/environments/environment';
import { Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserAuthentication } from './user-authentication';

@Injectable({
  providedIn: 'root',
})
export class LoginApi {
  private url = environment.apiUrl;
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  private userAuth = inject(UserAuthentication);
  private destroyRef = inject(DestroyRef);

  loading = signal<boolean>(false);

  errorResponse = signal<{ error: boolean; message: string | null }>({ error: false, message: null });

  loginWithCredentials(userName: string, password: string) {
    this.loading.set(true);
    return this.httpClient
      .post<{ accessToken: string; refreshToken: string }>(`${this.url}/Auth/login`, {
        userName,
        password,
      })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((error: HttpErrorResponse) => {
          this.loading.set(false);
          this.errorResponse.set({
            error: true,
            message: error.error.message || 'Error del servidor',
          });
          setTimeout(() => this.errorResponse.set({ error: false, message: null }), 3000);
          return EMPTY;
        })
      )
      .subscribe((response) => {
        this.errorResponse.set({ error: false, message: null });
        this.loading.set(false);
        this.userAuth.setLocalStorageTokens(response.accessToken, response.refreshToken);
        this.router.navigate(['/']);
      });
  }

  logout = () => {
    this.userAuth.clearTokens();
    this.router.navigate(['/login']);
  };
}

