import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from '@src/environments/environment';
import { response } from 'express';
import { catchError, EMPTY, Observable } from 'rxjs';
import { LeagueWithJerseys, LeagueWithJerseysApiResponse } from '../../jerseys/models/jersey-card';
import { homeJerseyAdapter } from '../adapters/home-jersey-adapter';

@Injectable({
  providedIn: 'root'
})
export class GetHomeJerseys {
  private url = environment.apiUrl;
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  jerseysHome = signal<LeagueWithJerseys[]>([]);

  errorResponse = signal<{ error: boolean; message: string | null }>({ error: false, message: null });

  getJerseyHomeApi(){
    return this.httpClient.get<LeagueWithJerseysApiResponse[]>(`${this.url}/Jersey`)
    .pipe(
      takeUntilDestroyed(this.destroyRef),
      catchError((error: HttpErrorResponse) => {
        this.errorResponse.set({
          error: true,
          message: error.error?.message || 'No se pudo obtener las camisetas',
        });
        setTimeout(() => this.errorResponse.set({ error: false, message: null }), 3000);
        return EMPTY;
      })
    )
    .subscribe(response => {
      const adaptedData = homeJerseyAdapter(response);
      this.jerseysHome.set(adaptedData);
    });
  };

}
