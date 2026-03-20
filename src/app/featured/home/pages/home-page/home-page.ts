import { Component, computed, inject, signal } from '@angular/core';
import { Category, Leagues } from '@src/app/featured/categories/models/category';
import { CategoryList } from "@src/app/featured/categories/components/category-list/category-list";
import { allLeagues, LeagueWithJerseys } from '@src/app/featured/jerseys/models/jersey-card';
import { ListJerseys } from "@src/app/featured/jerseys/components/list-jerseys/list-jerseys";
import { GetHomeJerseys } from '../../services/get-home-jerseys';

@Component({
  selector: 'app-home-page',
  imports: [CategoryList, ListJerseys],
  templateUrl: './home-page.html',
})
export class HomePage {
  jerseyHomeApiService = inject(GetHomeJerseys);

 categories = signal<Category[]> ([
    { id: 1, name: 'Premier league - Inglaterra' },
    { id: 2, name: 'Serie A - Italia' },
    { id: 3, name: 'La liga - España' },
    { id: 4, name: 'Bundesliga - Alemania' },
    { id: 5, name: 'Brasileirao - Brasil' },
    { id: 6, name: 'Camisetas retro' },
    { id: 7, name: 'Camisetas versión jugador' },
    { id: 8, name: 'Camisetas versión fanático' }
  ]);

  leagues =  signal<Leagues[]>([
      {
        country: 'España',
        leagues: [
          { id: 1, name: 'Real Madrid' },
          { id: 2, name: 'FC Barcelona' },
          { id: 3, name: 'Atlético de Madrid' },
          { id: 4, name: 'Sevilla FC' },
          { id: 5, name: 'Valencia CF' },
        ],
      },
      {
        country: 'Inglaterra',
        leagues: [
          { id: 6, name: 'Manchester United' },
          { id: 7, name: 'Manchester City' },
          { id: 8, name: 'Liverpool' },
          { id: 9, name: 'Chelsea' },
          { id: 10, name: 'Arsenal' },
        ],
      },
      {
        country: 'Italia',
        leagues: [
          { id: 11, name: 'Juventus' },
          { id: 12, name: 'AC Milan' },
          { id: 13, name: 'Inter de Milán' },
          { id: 14, name: 'AS Roma' },
          { id: 15, name: 'Napoli' },
        ],
      },
  ]);

  constructor(){
    this.jerseyHomeApiService.getJerseyHomeApi();
  }

  jerseys = computed<LeagueWithJerseys[]>(() => this.jerseyHomeApiService.jerseysHome());

  getJerseysByLeague(leagueName: string) {
    const league = this.jerseys().find(l => l.country === leagueName);
    return league ? league.jerseys : [];
  }

}
