import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { environment } from '@src/environments/environment';
import { catchError, EMPTY } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { JerseyDetail, jerseyDetailsMock } from '../models/Jersey-details';
import { jerseyDeatailsAdapter } from '../adapters/jersey-adapters';

@Injectable({
  providedIn: 'root'
})
export class GetJerseyById {
  private url = environment.apiUrl;
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  jerseyDetail = signal<JerseyDetail>(jerseyDetailsMock);

  loading = signal<boolean>(false);
  errorResponse = signal<{ error: boolean; message: string | null }>({ error: false, message: null });

  getJerseyByIdApi(id: number){
    this.loading.set(true);
    return this.httpClient.get<JerseyDetail>(`${this.url}/Jersey/${id}`)
    .pipe(
      takeUntilDestroyed(this.destroyRef),
      catchError((error: HttpErrorResponse) => {
        this.loading.set(false);
        this.errorResponse.set({
          error: true,
          message: error.error?.message || 'Error al cargar la información de la camiseta',
        });
        setTimeout(() => this.errorResponse.set({ error: false, message: null }), 3000);
        return EMPTY;
      })
    ).subscribe(response => {
      this.loading.set(false);
      this.jerseyDetail.set(jerseyDeatailsAdapter(response));
    })
  }
}
