export interface JerseyDetail {
  id: number;
  name: string;
  price: number;
  rating: number;
  reviewsCount: number;
  category: string;
  brand: string;
  type: string;
  season: string;
  weightKg: number;
  tag?: string;
  images: string[];
  availableSizes: JerseySize[];
  patches: PatchOption[];
  stock: number;
  description?: string;
  isFavorite: boolean;
  reviews?: JerseyReview[];
}

export interface JerseySize {
  code: 'S' | 'M' | 'L' | 'XL' | '2XL';
  available: boolean;
}

export interface PatchOption {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

export interface JerseyReview {
  id: number;
  user: string;
  countryFlag?: string; // URL de la bandera del país
  overallRating: number;
  date: string;
  ratings: {
    quality: number;
    delivery: number;
    details: number;
  };
  comments: {
    quality: string;
    delivery: string;
    details: string;
  };
  generalComment: string;
  images?: string[]; // URLs de imágenes adjuntas a la reseña
}

/**
 * Estado del producto según la elección del usuario
 */
export interface JerseySelection {
  productId: number;
  selectedSize: 'S' | 'M' | 'L' | 'XL' | '2XL';
  selectedPatches: number[]; // IDs de parches elegidos
  customization?: CustomizationInput;
  quantity: number;
  totalPrice: number;
}

export interface CustomizationInput {
  name?: string;
  number?: number;
  font?: string;
}
