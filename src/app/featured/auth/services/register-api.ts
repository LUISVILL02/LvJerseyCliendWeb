import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DestroyRef, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { commonRoutes } from '@src/app/app.routes';
import { environment } from '@src/environments/environment';
import { catchError, EMPTY } from 'rxjs';
import { RegisterBody } from '../model/register';

@Injectable({
  providedIn: 'root'
})
export class RegisterApi {
  
  private url = environment.apiUrl;
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  takeUntilDestroyRef = inject(DestroyRef);
  platformId = inject(PLATFORM_ID);

  loading = signal<boolean>(false);
  loadingResendCode = signal<boolean>(false);

  errorResponse = signal<{error: boolean; message: string | null}>({ error: false, message: null });

  registerWithCredentials(data: RegisterBody) {
    this.loading.set(true);
    this.httpClient.post<{ message: string }>(`${this.url}/Auth/register`, data)
    .pipe(
      takeUntilDestroyed(this.takeUntilDestroyRef),
      catchError((error: HttpErrorResponse) => {
        this.loading.set(false);
        this.errorResponse.set({ error: true, message: error.error?.message ?? 'Error desconocido' });
        setTimeout(() => this.errorResponse.set({ error: false, message: null }), 3000);
        return EMPTY;
      })
    ).subscribe(() => {
      this.loading.set(false);
      this.router.navigate([commonRoutes.AUTH.BASE, commonRoutes.AUTH.EMAILVERIFICATION, data.email]);
    })
  }

  veriefyEmailCode(email: string, code: string) {
    this.loading.set(true);
    this.httpClient.post(`${this.url}/Auth/verified-code`, { email, code })
    .pipe(
      takeUntilDestroyed(this.takeUntilDestroyRef),
      catchError((error: HttpErrorResponse) => {
        this.loading.set(false);
        this.errorResponse.set({ error: true, message: error.error?.message ?? 'Error desconocido' });
        setTimeout(() => this.errorResponse.set({ error: false, message: null }), 3000);
        return EMPTY;
      })
    ).subscribe(() => {
      this.loading.set(false);
      this.router.navigate([commonRoutes.AUTH.BASE, commonRoutes.AUTH.LOGIN]);
    });
  }

  resendVerificationCode(email: string) {
    this.loadingResendCode.set(true);
    this.httpClient.post<{ message: string }>(`${this.url}/Auth/resend-code-verification`, { email })
    .pipe(
      takeUntilDestroyed(this.takeUntilDestroyRef),
      catchError((error: HttpErrorResponse) => {
        this.loadingResendCode.set(false);
        this.errorResponse.set({ error: true, message: error.error?.message ?? 'Error desconocido' });
        setTimeout(() => this.errorResponse.set({ error: false, message: null }), 3000);
        return EMPTY;
      })
    ).subscribe(() => {
      this.loadingResendCode.set(false);
      this.errorResponse.set({ error: false, message: 'Código reenviado correctamente' });
      setTimeout(() => this.errorResponse.set({ error: false, message: null }), 3000);
    });
  }
}
