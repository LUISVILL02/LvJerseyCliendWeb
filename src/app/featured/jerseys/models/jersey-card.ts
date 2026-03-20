export interface JerseyCard {
  id: number;              // Identificador único
  imageUrl: string;        // URL de la imagen
  name: string;            // Camiseta Local Real Madrid 23/24
  typeDescription: string; // Opcional: Versión jugador, fanático, retro
  price: number;           // 100000 (mejor en número que string)
  rating: number;          // 4.1
  isFavorite: boolean;     // true/false para el corazón
}

export interface LeagueWithJerseys {
  league: string;        // Nombre de la liga (La Liga, Premier League, Serie A)
  country: string;       // País (España, Inglaterra, Italia)
  jerseys: JerseyCard[]; // Lista de 10 jerseys
}

//Servidor
export interface JerseyApiResponse {
  id: number;              // Identificador único
  imageUrl: string;        // URL de la imagen
  name: string;            // Camiseta Local Real Madrid 23/24
  typeDescription: string; // Opcional: Versión jugador, fanático, retro
  price: number;           // 100000 (mejor en número que string)
  rating: number;          // 4.1
  isFavorite: boolean; 
}

export interface LeagueWithJerseysApiResponse {
  league: string;        // Nombre de la liga (La Liga, Premier League, Serie A)
  country: string; 
  jerseys: JerseyApiResponse[];
}

// =========================
// LA LIGA (ESPAÑA)
// =========================
export const laLigaJerseys: JerseyCard[] = [
  { id: 1, imageUrl: '', name: 'Camiseta Local Real Madrid 24/25', typeDescription: 'Versión jugador', price: 120000, rating: 4.8, isFavorite: false },
  { id: 2, imageUrl: '', name: 'Camiseta Visitante FC Barcelona 24/25', typeDescription: 'Fanático', price: 100000, rating: 4.5, isFavorite: false },
  { id: 3, imageUrl: '', name: 'Camiseta Tercera Atlético de Madrid 23/24', typeDescription: 'Versión jugador', price: 115000, rating: 4.6, isFavorite: false },
  { id: 4, imageUrl: '', name: 'Camiseta Local Sevilla FC 24/25', typeDescription: 'Fanático', price: 95000, rating: 4.3, isFavorite: false },
  { id: 5, imageUrl: '', name: 'Camiseta Retro Valencia CF 2004', typeDescription: 'Retro', price: 85000, rating: 4.7, isFavorite: true },
  { id: 6, imageUrl: '', name: 'Camiseta Visitante Real Sociedad 24/25', typeDescription: 'Fanático', price: 90000, rating: 4.2, isFavorite: false },
  { id: 7, imageUrl: '', name: 'Camiseta Local Athletic Club 24/25', typeDescription: 'Versión jugador', price: 110000, rating: 4.4, isFavorite: false },
  { id: 8, imageUrl: '', name: 'Camiseta Tercera Real Betis 23/24', typeDescription: 'Fanático', price: 88000, rating: 4.1, isFavorite: false },
  { id: 9, imageUrl: '', name: 'Camiseta Local Villarreal CF 24/25', typeDescription: 'Fanático', price: 92000, rating: 4.0, isFavorite: false },
  { id: 10, imageUrl: '', name: 'Camiseta Retro Deportivo La Coruña 1999', typeDescription: 'Retro', price: 80000, rating: 4.9, isFavorite: true },
];

// =========================
// PREMIER LEAGUE (INGLATERRA)
// =========================
export const premierLeagueJerseys: JerseyCard[] = [
  { id: 11, imageUrl: '', name: 'Camiseta Local Manchester United 24/25', typeDescription: 'Fanático', price: 110000, rating: 4.6, isFavorite: false },
  { id: 12, imageUrl: '', name: 'Camiseta Visitante Manchester City 24/25', typeDescription: 'Versión jugador', price: 130000, rating: 4.8, isFavorite: true },
  { id: 13, imageUrl: '', name: 'Camiseta Local Liverpool 24/25', typeDescription: 'Fanático', price: 105000, rating: 4.7, isFavorite: false },
  { id: 14, imageUrl: '', name: 'Camiseta Tercera Chelsea 23/24', typeDescription: 'Fanático', price: 95000, rating: 4.3, isFavorite: false },
  { id: 15, imageUrl: '', name: 'Camiseta Retro Arsenal 2004 Invincibles', typeDescription: 'Retro', price: 140000, rating: 5.0, isFavorite: true },
  { id: 16, imageUrl: '', name: 'Camiseta Local Tottenham 24/25', typeDescription: 'Fanático', price: 98000, rating: 4.2, isFavorite: false },
  { id: 17, imageUrl: '', name: 'Camiseta Local Newcastle 24/25', typeDescription: 'Versión jugador', price: 115000, rating: 4.4, isFavorite: false },
  { id: 18, imageUrl: '', name: 'Camiseta Visitante Aston Villa 24/25', typeDescription: 'Fanático', price: 93000, rating: 4.1, isFavorite: false },
  { id: 19, imageUrl: '', name: 'Camiseta Local West Ham 24/25', typeDescription: 'Fanático', price: 90000, rating: 4.0, isFavorite: false },
  { id: 20, imageUrl: '', name: 'Camiseta Retro Leeds United 1992', typeDescription: 'Retro', price: 85000, rating: 4.5, isFavorite: true },
];

// =========================
// SERIE A (ITALIA)
// =========================
export const serieAJerseys: JerseyCard[] = [
  { id: 21, imageUrl: '', name: 'Camiseta Local Juventus 24/25', typeDescription: 'Versión jugador', price: 125000, rating: 4.7, isFavorite: false },
  { id: 22, imageUrl: '', name: 'Camiseta Visitante AC Milan 24/25', typeDescription: 'Fanático', price: 110000, rating: 4.6, isFavorite: false },
  { id: 23, imageUrl: '', name: 'Camiseta Local Inter de Milán 24/25', typeDescription: 'Versión jugador', price: 130000, rating: 4.8, isFavorite: true },
  { id: 24, imageUrl: '', name: 'Camiseta Tercera AS Roma 23/24', typeDescription: 'Fanático', price: 98000, rating: 4.3, isFavorite: false },
  { id: 25, imageUrl: '', name: 'Camiseta Retro Napoli 1989 Maradona', typeDescription: 'Retro', price: 150000, rating: 5.0, isFavorite: true },
  { id: 26, imageUrl: '', name: 'Camiseta Local Lazio 24/25', typeDescription: 'Fanático', price: 92000, rating: 4.2, isFavorite: false },
  { id: 27, imageUrl: '', name: 'Camiseta Local Fiorentina 24/25', typeDescription: 'Fanático', price: 90000, rating: 4.1, isFavorite: false },
  { id: 28, imageUrl: '', name: 'Camiseta Visitante Atalanta 24/25', typeDescription: 'Fanático', price: 88000, rating: 4.0, isFavorite: false },
  { id: 29, imageUrl: '', name: 'Camiseta Local Torino 24/25', typeDescription: 'Fanático', price: 85000, rating: 3.9, isFavorite: false },
  { id: 30, imageUrl: '', name: 'Camiseta Retro Parma 1999', typeDescription: 'Retro', price: 95000, rating: 4.6, isFavorite: true },
];


export const allLeagues: LeagueWithJerseys[] = [
  {
    league: 'La Liga',
    country: 'España',
    jerseys: laLigaJerseys,
  },
  {
    league: 'Premier League',
    country: 'Inglaterra',
    jerseys: premierLeagueJerseys,
  },
  {
    league: 'Serie A',
    country: 'Italia',
    jerseys: serieAJerseys,
  },
];