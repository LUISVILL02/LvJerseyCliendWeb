export interface PatchMetadata {
  name: string;
  season: string;
}

export interface CreateJerseyRequest {
  name: string;
  clubName: string;
  price: number;
  stock: number;
  type: 'Retro' | 'Jugador' | 'Fan';
  sex: 'Male' | 'Female';
  sizeSymbols: string[];
  weight: number;
  brand: string;
  season: string;
  categories: string[];
  images: File[];
  patchImages?: File[];
  patchMetadata?: PatchMetadata[];
}
