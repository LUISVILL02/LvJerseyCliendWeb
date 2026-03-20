import { LeagueWithJerseys, LeagueWithJerseysApiResponse } from "../../jerseys/models/jersey-card";

export const homeJerseyAdapter = (response: LeagueWithJerseysApiResponse[]): LeagueWithJerseys[] => {
  return response.map(league => {
    return {
        country: league.country,
        league: league.league,
        jerseys: league.jerseys.map(jersey => ({
            id: jersey.id,
            name: jersey.name,
            imageUrl: jersey.imageUrl,
            typeDescription: jersey.typeDescription,
            price: jersey.price,
            rating: jersey.rating,
            isFavorite: jersey.isFavorite
        }))
    }
  });
};