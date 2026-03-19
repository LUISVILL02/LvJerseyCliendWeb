import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { environment } from '@src/environments/environment';
import { catchError, EMPTY } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class JerseyApi {
  private url = environment.apiUrl;
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  loading = signal<boolean>(false);
  errorResponse = signal<{ error: boolean; message: string | null }>({ error: false, message: null });
  successMessage = signal<string | null>(null);
  isSuccessCreate = signal<boolean>(false);

  createJerseyApi(formData: FormData) {
    this.loading.set(true);
    return this.httpClient.post(`${this.url}/Jersey`, formData).pipe(
      takeUntilDestroyed(this.destroyRef),
      catchError((error: HttpErrorResponse) => {
        this.loading.set(false);
        this.errorResponse.set({
          error: true,
          message: error.error?.message || 'Error al crear la camiseta',
        });
        setTimeout(() => this.errorResponse.set({ error: false, message: null }), 3000);
        return EMPTY;
      })
    );
  }

  createJersey(formData: FormData) {
    this.createJerseyApi(formData)
    .pipe(
      takeUntilDestroyed(this.destroyRef),
      catchError((error: HttpErrorResponse) => {
        this.loading.set(false);
        this.isSuccessCreate.set(false);
        this.errorResponse.set({
          error: true,
          message: error.error?.message || 'Error al crear la camiseta',
        });
        setTimeout(() => this.errorResponse.set({ error: false, message: null }), 3000);
        return EMPTY;
      })
    )
    .subscribe(response => {
      this.isSuccessCreate.set(true);
      this.successMessage.set('Camiseta creada exitosamente');
       setTimeout(() => this.successMessage.set(null), 3000);
       this.loading.set(false);
    });
  }

  toggleLoading(isLoading: boolean) {
    this.loading.set(isLoading);
  }
}
