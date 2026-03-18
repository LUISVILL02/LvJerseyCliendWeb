export interface Category {
  id: number;
  name: string;
}

export interface Leagues {
  country: string;
    leagues: Category[];
}